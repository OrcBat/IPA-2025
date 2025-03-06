import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  CircularProgress,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Chip,
} from "@mui/material";
import {
  getArtists,
  createArtist,
  updateArtist,
  deleteArtist,
} from "../../api/artistApi";
import { getGenres } from "../../api/genreApi";
import { useAuth } from "../../context/AuthContext";
import { Artist } from "../../models/ArtistModel";
import ArtistList from "../organisms/ArtistList";
import { Genre } from "../../models/GenreModel";

const Artists = () => {
  const { user } = useAuth();
  const isAdmin = user ? user.roles.includes("ROLE_ADMIN") : false;
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [editArtist, setEditArtist] = useState<Artist | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    fetchArtists();
    fetchGenres();
  }, []);

  const fetchArtists = async () => {
    setLoading(true);
    setArtists(await getArtists());
    setLoading(false);
  };

  const fetchGenres = async () => {
    setGenres(await getGenres());
  };

  const handleOpenDialog = (artist: Artist | null = null) => {
    setEditArtist(
      artist || {
        id: "",
        name: "",
        genre: "",
        songs: [],
      }
    );
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setEditArtist(null);
    setOpenDialog(false);
  };

  const handleSaveArtist = async () => {
    if (editArtist) {
      if (editArtist.id) {
        await updateArtist(editArtist);
      } else {
        await createArtist(editArtist);
      }
      fetchArtists();
      handleCloseDialog();
    }
  };

  const handleDeleteArtist = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this artist?")) {
      await deleteArtist(id);
      fetchArtists();
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4">Artists</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Box sx={{ position: "relative", mt: 5 }}>
          {isAdmin && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleOpenDialog()}
              sx={{ position: "absolute", top: -50, right: 0 }}
            >
              Add Artist
            </Button>
          )}
          <ArtistList
            artists={artists}
            onEdit={handleOpenDialog}
            onDelete={handleDeleteArtist}
            isAdmin={isAdmin}
          />
        </Box>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {editArtist?.id ? "Edit Artist" : "Add Artist"}
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ marginTop: 1 }}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              value={editArtist?.name || ""}
              onChange={(e) =>
                setEditArtist({ ...editArtist!, name: e.target.value })
              }
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginTop: 1 }}>
            <InputLabel>Genre</InputLabel>
            <Select
              label="Genre"
              value={editArtist?.genre ?? ""}
              name="genre"
              onChange={(e) =>
                setEditArtist((prev) =>
                  prev ? { ...prev, genre: e.target.value } : null
                )
              }
            >
              {Array.isArray(genres) && genres.length > 0 ? (
                genres.map((genre) => (
                  <MenuItem key={genre.id} value={genre.name}>
                    {genre.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No genres available</MenuItem>
              )}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveArtist} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Artists;
