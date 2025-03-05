import React from "react";
import { ListItem, ListItemText, IconButton, Chip, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import AddIcon from "@mui/icons-material/Add";
import { Song } from "../../models/SongModel";

interface SongItemProps {
  song: Song;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onAddToPlaylist?: (id: string) => void;
}

const SongItem: React.FC<SongItemProps> = ({
  song,
  onEdit,
  onDelete,
  onAddToPlaylist,
}) => {
  return (
    <ListItem
      sx={{ border: 1, borderColor: "lightGrey" }}
      secondaryAction={
        <>
          {onAddToPlaylist && (
            <IconButton onClick={() => onAddToPlaylist(song.id)}>
              <AddIcon />
            </IconButton>
          )}
          {onEdit && (
            <IconButton onClick={() => onEdit(song.id)}>
              <EditIcon />
            </IconButton>
          )}
          {onDelete && (
            <IconButton onClick={() => onDelete(song.id)}>
              <DeleteIcon />
            </IconButton>
          )}
        </>
      }
    >
      <ListItemText
        primary={song.title}
        secondary={
          <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
            <Chip
              icon={<LibraryMusicIcon />}
              label={`Artist: ${song.artist}`}
            />
            {song.genres.map((g, index) => (
              <Chip key={index} label={g} />
            ))}
            {song.mood && <Chip label={`Mood: ${song.mood}`} />}
            {song.energy && <Chip label={`Energy: ${song.energy}`} />}
            {song.plays !== undefined && (
              <Chip label={`Plays: ${song.plays}`} />
            )}
            {song.releaseDate !== undefined && (
              <Chip label={`Release Date: ${song.releaseDate}`} />
            )}
          </Box>
        }
      />
    </ListItem>
  );
};

export default SongItem;
