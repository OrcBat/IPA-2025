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
import { Genre } from "../../models/GenreModel";

interface GenreItemProps {
  genre: Genre;
  onEdit?: (genre: Genre) => void;
  onDelete?: (id: string) => void;
}

const GenreItem: React.FC<GenreItemProps> = ({ genre, onEdit, onDelete }) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <ListItemText primary={genre.name} />
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="body2">
          <strong>Artists:</strong>
        </Typography>
        <List>
          {genre.artists.length > 0 ? (
            genre.artists.map((artist) => (
              <MuiListItem key={artist}>{artist}</MuiListItem>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              No artists assigned
            </Typography>
          )}
        </List>
        <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
          {onEdit && (
            <IconButton onClick={() => onEdit(genre)} color="primary">
              <EditIcon />
            </IconButton>
          )}
          {onDelete && (
            <IconButton onClick={() => onDelete(genre.id)} color="secondary">
              <DeleteIcon />
            </IconButton>
          )}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default GenreItem;
