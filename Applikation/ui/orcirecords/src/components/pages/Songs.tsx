import React, { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Tab,
  Tabs,
  SelectChangeEvent,
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
import SongList from "../organisms/song/SongList";
import { useAuth } from "../../context/AuthContext";
import { Song } from "../../models/SongModel";
import { Playlist } from "../../models/PlaylistModel";
import { Genre } from "../../models/GenreModel";
import { getArtists } from "../../api/artistApi";
import { Artist } from "../../models/ArtistModel";
import MatchesLegend from "../molecules/MatchesLegend";
import SongDialog from "../organisms/song/SongDialog";
import PlaylistDialog from "../organisms/song/PlaylistDialog";
import GeneralSongSearch from "../organisms/song/GeneralSongSearch";
import RecommendedSongSearch from "../organisms/song/RecommendedSongSearch";

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
    "",
    "Happy",
    "Sad",
    "Angry",
    "Exciting",
    "Relaxed",
    "Romantic",
    "Nostalgic",
  ];
  const energyOptions = ["", "High", "Medium", "Low"];

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

  const handleDialogInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string | string[]>
  ) => {
    if (!editSong) return;
    const { name, value } = e.target;

    setEditSong((prev) => ({
      ...prev!,
      [name]: name === "genres" ? (value as string[]) : value,
    }));
  };

  const handleDateChange = (newDate: Date | null) => {
    newDate!.setUTCDate(newDate!.getUTCDate());
    let formattedDate = newDate ? newDate.toISOString() : "";

    if (editSong) {
      setEditSong({
        ...editSong,
        releaseDate: formattedDate,
      });
    }
  };

  const handleSearch = (recommendations: boolean) => {
    fetchSongs(recommendations);
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
        matchPercentage: 0,
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
      if (editSong.id) {
        await updateSong(editSong);
      } else {
        await createSong(editSong);
      }
      fetchSongs(false);
      handleCloseDialog();
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
      alert("Song successfully added to playlist ");
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
    setFilters({
      title: "",
      artist: "",
      genre: [],
      mood: "",
      energy: "",
      releaseDate: "",
      plays: "",
    });
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box>
        <Typography variant="h4">Songs</Typography>

        <Tabs value={tabIndex} onChange={handleTabChange} sx={{ mb: 2 }}>
          <Tab label="General Search" />
          <Tab label="Get Recommendations" />
        </Tabs>

        <MatchesLegend />

        {tabIndex === 0 && (
          <>
            <GeneralSongSearch
              filters={filters}
              setFilters={setFilters}
              handleSearch={handleSearch}
              editSong={editSong}
            />
            {loading ? (
              <CircularProgress />
            ) : (
              <SongList
                songs={songs}
                onEdit={handleOpenDialog}
                onDelete={handleDeleteSong}
                onAddToPlaylist={handleAddToPlaylistClick}
                handleOpenDialog={handleOpenDialog}
                isAdmin={isAdmin}
              />
            )}
          </>
        )}

        {tabIndex === 1 && (
          <>
            <RecommendedSongSearch
              filters={filters}
              setFilters={setFilters}
              genres={genres}
              handleSearch={handleSearch}
              moodOptions={moodOptions}
              energyOptions={energyOptions}
            />
            {loading ? (
              <CircularProgress />
            ) : (
              <SongList
                songs={recommendedSongs}
                onEdit={handleOpenDialog}
                onDelete={handleDeleteSong}
                onAddToPlaylist={handleAddToPlaylistClick}
                handleOpenDialog={handleOpenDialog}
                isAdmin={isAdmin}
              />
            )}
          </>
        )}

        <SongDialog
          open={openDialog}
          song={editSong}
          genres={genres}
          artists={artists}
          moodOptions={moodOptions}
          energyOptions={energyOptions}
          onClose={handleCloseDialog}
          onChange={handleDialogInputChange}
          onDateChange={handleDateChange}
          onSave={handleSaveSong}
        />

        <PlaylistDialog
          open={playlistDialogOpen}
          playlists={playlists}
          selectedPlaylist={selectedPlaylist}
          onClose={() => setPlaylistDialogOpen(false)}
          onChange={(e) => setSelectedPlaylist(e.target.value)}
          onConfirm={handleConfirmAddToPlaylist}
        />
      </Box>
    </Box>
  );
};

export default Songs;
