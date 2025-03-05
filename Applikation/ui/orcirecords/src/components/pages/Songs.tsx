import React, { useState, useEffect } from "react";
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
  Chip,
  Checkbox,
  ListItemText,
  InputLabel,
  FormControl,
  Tab,
  Tabs,
} from "@mui/material";
import {
  getSongs,
  createSong,
  updateSong,
  deleteSong,
} from "../../api/songApi";
import {
  getPlaylists,
  addSongToPlaylist,
  getCurrentUserPlaylists,
} from "../../api/playlistApi";
import { getGenres } from "../../api/genreApi";
import SongList from "../organisms/SongList";
import { useAuth } from "../../context/AuthContext";
import { Song } from "../../models/SongModel";
import { Playlist } from "../../models/PlaylistModel";
import { Genre } from "../../models/GenreModel";
import { getArtists } from "../../api/artistApi";
import { Artist } from "../../models/ArtistModel";
import DatePicker from "../atoms/DatePicker";

const Songs = () => {
  const { user } = useAuth();
  const isAdmin = user ? user.roles.includes("ROLE_ADMIN") : false;
  const [tabIndex, setTabIndex] = useState(0);
  const [songs, setSongs] = useState<Song[]>([]);
  const [recommendedSongs, setRecommendedSongs] = useState<Song[]>([]);
  const [filters, setFilters] = useState({
    title: "",
    artist: "",
    genre: [] as string[],
    mood: "",
    energy: "",
    releaseDate: "",
    plays: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [editSong, setEditSong] = useState<Song | null>(null);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<string>("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [selectedSongId, setSelectedSongId] = useState<string | null>(null);
  const [playlistDialogOpen, setPlaylistDialogOpen] = useState(false);
  const moodOptions = [
    "-",
    "Happy",
    "Sad",
    "Angry",
    "Exciting",
    "Relaxed",
    "Romantic",
    "Nostalgic",
  ];
  const energyOptions = ["-", "High", "Medium", "Low"];

  useEffect(() => {
    fetchSongs(false);
    fetchPlaylists();
    fetchGenres();
    fetchArtists();
  }, []);

  const fetchSongs = async (recommended: boolean) => {
    setLoading(true);
    try {
      const activeFilters = Object.fromEntries(
        Object.entries(filters)
          .filter(([, value]) =>
            Array.isArray(value) ? value.length : value.trim()
          )
          .map(([key, value]) => [
            key,
            Array.isArray(value) ? value.join(",") : value,
          ])
      );

      recommended
        ? setRecommendedSongs(await getSongs(activeFilters))
        : setSongs(await getSongs(activeFilters));
    } catch (error) {
      console.error("Error loading songs: ", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlaylists = async () => {
    try {
      const playlistData = isAdmin
        ? await getPlaylists()
        : await getCurrentUserPlaylists();
      setPlaylists(playlistData);
    } catch (error) {
      console.error("Error loading playlists: ", error);
    }
  };

  const fetchGenres = async () => {
    try {
      const genreData = await getGenres();
      setGenres(genreData);
    } catch (error) {
      console.error("Error loading genres: ", error);
    }
  };

  const fetchArtists = async () => {
    try {
      const artistData = await getArtists();
      setArtists(artistData);
    } catch (error) {
      console.error("Error loading artists: ", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleDialogInputChange = (e: any) => {
    if (!editSong) return;
    const { name, value } = e.target;

    setEditSong((prev) => ({
      ...prev!,
      [name]: name === "genres" ? (value as string[]) : value,
    }));
  };

  const handleGenreChange = (event: any) => {
    const value = event.target.value;
    setFilters({ ...filters, genre: value });
  };

  const handleMoodChange = (e: any) => {
    const value = e.target.value;
    setFilters({ ...filters, mood: value });
  };

  const handleEnergyChange = (e: any) => {
    const value = e.target.value;
    setFilters({ ...filters, energy: value });
  };

  const handleDateChange = (newDate: Date | null) => {
    const formattedDate = newDate ? newDate.toISOString().split("T")[0] : "";
    setFilters({
      ...filters,
      releaseDate: formattedDate,
    });

    if (editSong) {
      setEditSong({
        ...editSong,
        releaseDate: formattedDate,
      });
    }
  };

  const handleSearch = () => {
    fetchSongs(false);
  };

  const handleGetRecommendations = () => {
    fetchSongs(true);
  };

  const handleOpenDialog = (song: Song | null = null) => {
    setEditSong(
      song || {
        id: "",
        title: "",
        artist: "",
        genres: [],
        mood: "",
        energy: "",
        releaseDate: "",
        plays: 0,
      }
    );
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setEditSong(null);
    setOpenDialog(false);
  };

  const handleSaveSong = async () => {
    if (editSong) {
      try {
        if (editSong.id) {
          await updateSong(editSong);
        } else {
          await createSong(editSong);
        }
        fetchSongs(false);
        handleCloseDialog();
      } catch (error) {
        console.error("Error saving song: ", error);
      }
    }
  };

  const handleDeleteSong = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this song?")) {
      await deleteSong(id);
      fetchSongs(false);
    }
  };

  const handleConfirmAddToPlaylist = async () => {
    if (!selectedSongId || !selectedPlaylist) {
      alert("Please select a playlist.");
      return;
    }

    try {
      await addSongToPlaylist(selectedSongId, selectedPlaylist);
      alert("Song added to playlist successfully");
      setPlaylistDialogOpen(false);
      setSelectedSongId(null);
    } catch (error) {
      console.error("Error adding song to playlist:", error);
      alert("Failed to add song to playlist.");
    }
  };

  const handleAddToPlaylistClick = (songId: string) => {
    setSelectedSongId(songId);
    setPlaylistDialogOpen(true);
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box>
        <Typography variant="h4">Songs</Typography>

        <Tabs value={tabIndex} onChange={handleTabChange} sx={{ mb: 2 }}>
          <Tab label="General Search" />
          <Tab label="Get Recommendations" />
        </Tabs>

        {tabIndex === 0 && (
          <>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
                marginTop: 1,
              }}
            >
              <TextField
                label="Title"
                name="title"
                onChange={handleInputChange}
              />
              <TextField
                label="Artist"
                name="artist"
                onChange={handleInputChange}
              />
              <FormControl sx={{ marginBottom: 2 }}>
                <DatePicker
                  label="Release Date"
                  value={editSong?.releaseDate || null}
                  onChange={handleDateChange}
                  format="yyyy-dd-MM"
                ></DatePicker>
              </FormControl>

              <TextField
                label="Plays"
                name="plays"
                onChange={handleInputChange}
                type="number"
              />
            </Box>

            <Button variant="contained" onClick={handleSearch}>
              Search
            </Button>

            {loading ? (
              <CircularProgress />
            ) : (
              <Box sx={{ position: "relative" }}>
                {isAdmin && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenDialog()}
                    sx={{ position: "absolute", top: -50, right: 0 }}
                  >
                    Add Song
                  </Button>
                )}
                <SongList
                  songs={songs}
                  onEdit={handleOpenDialog}
                  onDelete={handleDeleteSong}
                  onAddToPlaylist={handleAddToPlaylistClick}
                  isAdmin={isAdmin}
                />
              </Box>
            )}
          </>
        )}

        {tabIndex === 1 && (
          <>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
                marginBottom: 2,
                marginTop: 1,
              }}
            >
              <FormControl fullWidth sx={{ maxWidth: 200 }}>
                <InputLabel>Genre</InputLabel>
                <Select
                  label="Genre"
                  multiple
                  value={filters.genre}
                  onChange={handleGenreChange}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                      {(selected as string[]).map((value) => {
                        const genre = genres.find((g) => g.name === value);
                        return genre ? (
                          <Chip
                            key={genre.name}
                            label={genre.name}
                            sx={{ margin: 0.5 }}
                          />
                        ) : null;
                      })}
                    </Box>
                  )}
                >
                  {genres.map((genre) => (
                    <MenuItem key={genre.name} value={genre.name}>
                      <Checkbox checked={filters.genre.includes(genre.name)} />
                      <ListItemText primary={genre.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ maxWidth: 200 }}>
                <InputLabel>Mood</InputLabel>
                <Select
                  label="Mood"
                  name="mood"
                  value={filters.mood}
                  onChange={handleMoodChange}
                >
                  {moodOptions.map((mood) => (
                    <MenuItem key={mood} value={mood}>
                      {mood}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ maxWidth: 200 }}>
                <InputLabel>Energy</InputLabel>
                <Select
                  label="Energy"
                  name="energy"
                  value={filters.energy}
                  onChange={handleEnergyChange}
                >
                  {energyOptions.map((energy) => (
                    <MenuItem key={energy} value={energy}>
                      {energy}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Button variant="contained" onClick={handleGetRecommendations}>
              Get Recommendations
            </Button>

            {loading ? (
              <CircularProgress />
            ) : (
              <Box sx={{ position: "relative" }}>
                {isAdmin && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenDialog()}
                    sx={{ position: "absolute", top: -50, right: 0 }}
                  >
                    Add Song
                  </Button>
                )}
                <SongList
                  songs={recommendedSongs}
                  onEdit={handleOpenDialog}
                  onDelete={handleDeleteSong}
                  onAddToPlaylist={handleAddToPlaylistClick}
                  isAdmin={isAdmin}
                />
              </Box>
            )}
          </>
        )}

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>{editSong?.id ? "Edit Song" : "Add Song"}</DialogTitle>
          <DialogContent>
            <FormControl fullWidth sx={{ marginBottom: "2%", marginTop: "1%" }}>
              <TextField
                label="Title"
                name="title"
                fullWidth
                value={editSong?.title || ""}
                onChange={handleDialogInputChange}
              />
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: "2%" }}>
              <InputLabel>Artist</InputLabel>
              <Select
                label="artist"
                name="artist"
                value={editSong?.artist || ""}
                onChange={handleDialogInputChange}
              >
                {artists.map((artist) => (
                  <MenuItem key={artist.id} value={artist.name}>
                    {artist.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel>Genres</InputLabel>
              <Select
                multiple
                label="genres"
                name="genres"
                value={editSong?.genres || []}
                onChange={handleDialogInputChange}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                    {(selected as string[]).map((value) => {
                      const genre = genres.find((g) => g.name === value);
                      return genre ? (
                        <Chip
                          key={genre.id}
                          label={genre.name}
                          sx={{ margin: 0.5 }}
                        />
                      ) : null;
                    })}
                  </Box>
                )}
              >
                {genres.map((genre) => (
                  <MenuItem key={genre.id} value={genre.name}>
                    <Checkbox
                      checked={editSong?.genres?.includes(genre.name) || false}
                    />
                    <ListItemText primary={genre.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel>Mood</InputLabel>
              <Select
                label="Mood"
                name="mood"
                value={editSong?.mood || ""}
                onChange={handleDialogInputChange}
              >
                {moodOptions.map((mood) => (
                  <MenuItem key={mood} value={mood.toUpperCase()}>
                    {mood}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel>Energy</InputLabel>
              <Select
                label="Energy"
                name="energy"
                value={editSong?.energy || ""}
                onChange={handleDialogInputChange}
              >
                {energyOptions.map((energy) => (
                  <MenuItem key={energy} value={energy.toUpperCase()}>
                    {energy}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <DatePicker
                label="Release Date"
                value={
                  filters.releaseDate ? new Date(filters.releaseDate) : null
                }
                onChange={handleDateChange}
                format="yyyy-dd-MM"
              ></DatePicker>
            </FormControl>

            <TextField
              label="Plays"
              name="plays"
              fullWidth
              type="number"
              value={editSong?.plays || ""}
              onChange={handleDialogInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSaveSong} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={playlistDialogOpen}
          onClose={() => setPlaylistDialogOpen(false)}
        >
          <DialogTitle>Select a Playlist</DialogTitle>
          <DialogContent>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Playlist</InputLabel>
              <Select
                label="Playlist"
                value={selectedPlaylist}
                onChange={(e) => setSelectedPlaylist(e.target.value)}
              >
                {playlists.map((playlist) => (
                  <MenuItem key={playlist.id} value={playlist.id}>
                    {playlist.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setPlaylistDialogOpen(false)}
              color="secondary"
            >
              Cancel
            </Button>
            <Button onClick={handleConfirmAddToPlaylist} color="primary">
              Add Song
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Songs;
