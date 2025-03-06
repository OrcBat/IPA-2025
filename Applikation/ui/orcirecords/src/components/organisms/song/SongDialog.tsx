import {
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Chip,
  Checkbox,
  ListItemText,
  DialogActions,
  Button,
  SelectChangeEvent,
} from "@mui/material";
import DatePicker from "../../atoms/DatePicker";
import { Artist } from "../../../models/ArtistModel";
import { Genre } from "../../../models/GenreModel";
import { Song } from "../../../models/SongModel";

interface SongDialogProps {
  open: boolean;
  song: Song | null;
  genres: Genre[];
  artists: Artist[];
  moodOptions: string[];
  energyOptions: string[];
  onClose: () => void;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string | string[]>
  ) => void;
  onDateChange: (date: Date | null) => void;
  onSave: () => void;
}

const SongDialog: React.FC<SongDialogProps> = ({
  open,
  song,
  genres,
  artists,
  moodOptions,
  energyOptions,
  onClose,
  onChange,
  onDateChange,
  onSave,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{song?.id ? "Edit Song" : "Add Song"}</DialogTitle>
      <DialogContent>
        <FormControl fullWidth sx={{ marginBottom: "2%", marginTop: "1%" }}>
          <TextField
            label="Title"
            name="title"
            fullWidth
            value={song?.title || ""}
            onChange={onChange}
          />
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: "2%" }}>
          <InputLabel>Artist</InputLabel>
          <Select
            label="Artist"
            name="artist"
            value={song?.artist || ""}
            onChange={onChange}
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
            label="Genres"
            name="genres"
            value={song?.genres || []}
            onChange={onChange}
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
                  checked={song?.genres?.includes(genre.name) || false}
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
            value={song?.mood || ""}
            onChange={onChange}
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
            value={song?.energy || ""}
            onChange={onChange}
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
            value={song?.releaseDate ? new Date(song.releaseDate) : null}
            onChange={onDateChange}
            format="yyyy-MM-dd"
          />
        </FormControl>

        <TextField
          label="Plays"
          name="plays"
          fullWidth
          type="number"
          value={song?.plays || ""}
          onChange={onChange}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={onSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SongDialog;
