import React from "react";
import { Box, Button, List } from "@mui/material";
import { Song } from "../../../models/SongModel";
import SongItem from "../../molecules/SongItem";

interface SongListProps {
  songs: Song[];
  onEdit: (song: Song) => void;
  onDelete: (id: string) => void;
  onAddToPlaylist: (songId: string) => void;
  handleOpenDialog: () => void;
  isAdmin: boolean;
}

const SongList: React.FC<SongListProps> = ({
  songs,
  onEdit,
  onDelete,
  onAddToPlaylist,
  handleOpenDialog,
  isAdmin,
}) => {
  return (
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
      <List sx={{ marginTop: "2%" }}>
        {songs.map((song) => (
          <SongItem
            key={song.id}
            song={song}
            onEdit={isAdmin ? () => onEdit(song) : undefined}
            onDelete={isAdmin ? () => onDelete(song.id) : undefined}
            onAddToPlaylist={() => onAddToPlaylist(song.id)}
          />
        ))}
      </List>
    </Box>
  );
};

export default SongList;
