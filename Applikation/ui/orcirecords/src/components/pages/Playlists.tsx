import { useEffect, useState } from "react";
import {
  Typography,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Box,
} from "@mui/material";
import PlaylistList from "../organisms/PlaylistList";
import {
  getCurrentUserPlaylists,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
  removeSongFromPlaylist,
  getPlaylists,
} from "../../api/playlistApi";
import { Playlist } from "../../models/PlaylistModel";
import { useAuth } from "../../context/AuthContext";

const Playlists = () => {
  const { user } = useAuth();
  const isAdmin = user ? user.roles.includes("ROLE_ADMIN") : false;
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [editPlaylist, setEditPlaylist] = useState<Playlist | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    setLoading(true);
    try {
      setPlaylists(
        isAdmin ? await getPlaylists() : await getCurrentUserPlaylists()
      );
    } catch (error) {
      console.error("Error fetching playlists: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (playlist: Playlist | null = null) => {
    setEditPlaylist(playlist);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setEditPlaylist(null);
    setOpenDialog(false);
  };

  const handleSavePlaylist = async () => {
    if (editPlaylist) {
      try {
        if (editPlaylist.id) {
          await updatePlaylist(editPlaylist);
        } else {
          await createPlaylist(editPlaylist);
        }
        fetchPlaylists();
        handleCloseDialog();
      } catch (error) {
        console.error("Error saving playlist: ", error);
      }
    }
  };

  const handleDeletePlaylist = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this playlist?")) {
      await deletePlaylist(id);
      fetchPlaylists();
    }
  };

  const handleRemoveSong = async (playlistId: string, songId: string) => {
    await removeSongFromPlaylist(songId, playlistId);
    fetchPlaylists();
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4">Playlists</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Box sx={{ position: "relative", mt: 5 }}>
          <Button
            onClick={() => setOpenDialog(true)}
            variant="contained"
            sx={{ position: "absolute", top: -50, right: 0 }}
          >
            Add Playlist
          </Button>
          <PlaylistList
            playlists={playlists}
            onEdit={handleOpenDialog}
            onDelete={handleDeletePlaylist}
            onRemoveSong={handleRemoveSong}
          />
        </Box>
      )}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {editPlaylist ? "Edit Playlist" : "New Playlist"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Playlist Name"
            fullWidth
            value={editPlaylist?.name || ""}
            onChange={(e) =>
              setEditPlaylist({ ...editPlaylist!, name: e.target.value })
            }
            sx={{ my: 1 }}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            value={editPlaylist?.description || ""}
            onChange={(e) =>
              setEditPlaylist({ ...editPlaylist!, description: e.target.value })
            }
            sx={{ my: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSavePlaylist} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Playlists;
