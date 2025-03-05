import React from "react";
import {
  ListItemText,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem as MuiListItem,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Artist } from "../../models/ArtistModel";

interface ArtistItemProps {
  artist: Artist;
  onEdit?: (artist: Artist) => void;
  onDelete?: (id: string) => void;
}

const ArtistItem: React.FC<ArtistItemProps> = ({
  artist,
  onEdit,
  onDelete,
}) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <ListItemText primary={artist.name} />
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="body2">
          <strong>Genre:</strong> {artist.genre}
        </Typography>
        <Typography variant="body2">
          <strong>Songs:</strong>
        </Typography>
        <List>
          {artist.songs.length > 0 ? (
            artist.songs.map((song) => (
              <MuiListItem key={song}>{song}</MuiListItem>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              No songs assigned
            </Typography>
          )}
        </List>
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          {onEdit && (
            <IconButton onClick={() => onEdit(artist)} color="primary">
              <EditIcon />
            </IconButton>
          )}
          {onDelete && (
            <IconButton onClick={() => onDelete(artist.id)} color="secondary">
              <DeleteIcon />
            </IconButton>
          )}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default ArtistItem;
