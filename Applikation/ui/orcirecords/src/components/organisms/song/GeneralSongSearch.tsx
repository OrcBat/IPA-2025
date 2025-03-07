import { Box, TextField, Button, FormControl } from "@mui/material";
import DatePicker from "../../atoms/DatePicker";
import { Song } from "../../../models/SongModel";

interface Filters {
  title: string;
  artist: string;
  genre: string[];
  mood: string;
  energy: string;
  releaseDate: string;
  plays: string;
}

interface GeneralSongSearchProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  handleSearch: (recommended: boolean) => void;
  editSong: Song | null;
}

const GeneralSongSearch: React.FC<GeneralSongSearchProps> = ({
  filters,
  setFilters,
  handleSearch,
  editSong,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleDateChange = (newDate: Date | null) => {
    if (newDate) {
      newDate.setUTCHours(newDate.getHours());
    }
    const formattedDate = newDate ? newDate.toISOString().split("T")[0] : "";

    setFilters({
      ...filters,
      releaseDate: formattedDate,
    });
  };

  return (
    <>
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", marginTop: 1 }}>
        <TextField
          label="Title"
          name="title"
          value={filters.title}
          onChange={handleInputChange}
        />
        <TextField
          label="Artist"
          name="artist"
          value={filters.artist}
          onChange={handleInputChange}
        />
        <FormControl sx={{ marginBottom: 2 }}>
          <DatePicker
            label="Release Date"
            value={
              editSong?.releaseDate ? new Date(editSong.releaseDate) : null
            }
            onChange={handleDateChange}
            format="yyyy-MM-dd"
          />
        </FormControl>
        <TextField
          label="Plays"
          name="plays"
          value={filters.plays}
          onChange={handleInputChange}
          type="number"
        />
      </Box>
      <Button variant="contained" onClick={() => handleSearch(false)} data-testid="search-button">
        Search
      </Button>
    </>
  );
};

export default GeneralSongSearch;
