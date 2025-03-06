import {
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  DialogActions,
  Button,
  SelectChangeEvent,
} from "@mui/material";
import { Playlist } from "../../../models/PlaylistModel";

interface PlaylistDialogProps {
  open: boolean;
  playlists: Playlist[];
  selectedPlaylist: string;
  onClose: () => void;
  onChange: (event: SelectChangeEvent) => void;
  onConfirm: () => void;
}

const PlaylistDialog: React.FC<PlaylistDialogProps> = ({
  open,
  playlists,
  selectedPlaylist,
  onClose,
  onChange,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Select a Playlist</DialogTitle>
      <DialogContent>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Playlist</InputLabel>
          <Select label="Playlist" value={selectedPlaylist} onChange={onChange}>
            {playlists.map((playlist) => (
              <MenuItem key={playlist.id} value={playlist.id}>
                {playlist.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary">
          Add Song
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PlaylistDialog;
