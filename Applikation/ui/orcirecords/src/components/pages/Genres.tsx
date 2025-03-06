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
  FormControl,
} from "@mui/material";
import {
  getGenres,
  createGenre,
  updateGenre,
  deleteGenre,
} from "../../api/genreApi";
import { useAuth } from "../../context/AuthContext";
import { Genre } from "../../models/GenreModel";
import GenreList from "../organisms/GenreList";

const Genres = () => {
  const { user } = useAuth();
  const isAdmin = user ? user.roles.includes("ROLE_ADMIN") : false;
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [editGenre, setEditGenre] = useState<Genre | null>(null);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    setLoading(true);
    setGenres(await getGenres());
    setLoading(false);
  };

  const handleOpenDialog = (genre: Genre | null = null) => {
    setEditGenre(genre || { id: "", name: "", artists: [] });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setEditGenre(null);
    setOpenDialog(false);
  };

  const handleSaveGenre = async () => {
    if (editGenre) {
      if (editGenre.id) {
        await updateGenre(editGenre);
      } else {
        await createGenre({ name: editGenre.name });
      }
      fetchGenres();
      handleCloseDialog();
    }
  };

  const handleDeleteGenre = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this genre?")) {
      await deleteGenre(id);
      fetchGenres();
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4">Genres</Typography>
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
              Add Genre
            </Button>
          )}
          <GenreList
            genres={genres}
            onEdit={handleOpenDialog}
            onDelete={handleDeleteGenre}
            isAdmin={isAdmin}
          />
        </Box>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editGenre?.id ? "Edit Genre" : "Add Genre"}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ marginTop: 1 }}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              value={editGenre?.name || ""}
              onChange={(e) =>
                setEditGenre({ ...editGenre!, name: e.target.value })
              }
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveGenre} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Genres;
