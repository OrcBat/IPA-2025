import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Playlist } from "../../models/PlaylistModel";
import { useAuth } from "../../context/AuthContext";

interface PlaylistItemProps {
  playlist: Playlist;
  onEdit: (playlist: Playlist) => void;
  onDelete: (id: string) => void;
  onRemoveSong: (playlistId: string, songId: string) => void;
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({
  playlist,
  onEdit,
  onDelete,
  onRemoveSong,
}) => {
  const [expanded, setExpanded] = useState(false);
  const { user } = useAuth();

  return (
    <Accordion
      expanded={expanded}
      onChange={() => setExpanded(!expanded)}
      data-testid="playlist-accordion"
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <ListItemText primary={playlist.name} />
        <IconButton
          onClick={() => onEdit(playlist)}
          sx={{ ml: "auto" }}
          data-testid="edit-playlist-button"
        >
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={() => onDelete(playlist.id)}
          data-testid="delete-playlist-button"
        >
          <DeleteIcon />
        </IconButton>
      </AccordionSummary>
      <AccordionDetails>
        {user?.roles.includes("ROLE_ADMIN") && (
          <Typography variant="body1">
            <strong>Owner: </strong> {playlist.ownerName}
          </Typography>
        )}

        <Typography variant="body1">
          <strong>Description: </strong> {playlist.description}
        </Typography>

        {playlist.songs.length > 0 ? (
          <List>
            <strong>Songs: </strong>
            {playlist.songs.map((song) => (
              <ListItem
                key={song.id}
                secondaryAction={
                  <IconButton
                    onClick={() => onRemoveSong(playlist.id, song.id)}
                    data-testid="delete-song-button"
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={song.title} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2">No songs in this playlist.</Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default PlaylistItem;
