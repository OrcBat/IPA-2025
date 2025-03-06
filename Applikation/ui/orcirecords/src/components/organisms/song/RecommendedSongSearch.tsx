import {
  Box,
  FormControl,
  InputLabel,
  Select,
  Chip,
  MenuItem,
  Checkbox,
  Button,
  SelectChangeEvent,
} from "@mui/material";
import { Genre } from "../../../models/GenreModel";

interface Filters {
  title: string;
  artist: string;
  genre: string[];
  mood: string;
  energy: string;
  releaseDate: string;
  plays: string;
}

interface RecommendedSongSearchProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  handleSearch: (recommended: boolean) => void;
  genres: Genre[];
  moodOptions: string[];
  energyOptions: string[];
}

const RecommendedSongSearch: React.FC<RecommendedSongSearchProps> = ({
  filters,
  setFilters,
  handleSearch,
  genres,
  moodOptions,
  energyOptions,
}) => {
  const handleGenreChange = (event: SelectChangeEvent<string[]>) => {
    setFilters({ ...filters, genre: event.target.value as string[] });
  };

  const handleMoodChange = (event: SelectChangeEvent<string>) => {
    setFilters({ ...filters, mood: event.target.value });
  };

  const handleEnergyChange = (event: SelectChangeEvent<string>) => {
    setFilters({ ...filters, energy: event.target.value });
  };

  return (
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
            multiple
            label="Genre"
            value={filters.genre}
            onChange={handleGenreChange}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                {(selected as string[]).map((value) => (
                  <Chip key={value} label={value} sx={{ margin: 0.5 }} />
                ))}
              </Box>
            )}
          >
            {genres.map((genre) => (
              <MenuItem key={genre.name} value={genre.name}>
                <Checkbox checked={filters.genre.includes(genre.name)} />
                {genre.name}
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

      <Button variant="contained" onClick={() => handleSearch(true)}>
        Get Recommendations
      </Button>
    </>
  );
};

export default RecommendedSongSearch;
