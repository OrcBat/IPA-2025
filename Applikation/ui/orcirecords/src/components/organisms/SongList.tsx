import React from "react";
import { List } from "@mui/material";
import { Song } from "../../models/SongModel";
import SongItem from "../molecules/SongItem";

interface SongListProps {
  songs: Song[];
  onEdit: (song: Song) => void;
  onDelete: (id: string) => void;
  onAddToPlaylist: (songId: string) => void;
  isAdmin: boolean;
}

const SongList: React.FC<SongListProps> = ({
  songs,
  onEdit,
  onDelete,
  onAddToPlaylist,
  isAdmin,
}) => {
  return (
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
  );
};

export default SongList;
