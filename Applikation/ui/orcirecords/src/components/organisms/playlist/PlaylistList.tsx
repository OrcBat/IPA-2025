import React from "react";
import PlaylistItem from "../../molecules/PlaylistItem";
import { Playlist } from "../../../models/PlaylistModel";

interface PlaylistListProps {
  playlists: Playlist[];
  onEdit: (playlist: Playlist) => void;
  onDelete: (id: string) => void;
  onRemoveSong: (playlistId: string, songId: string) => void;
}

const PlaylistList: React.FC<PlaylistListProps> = ({
  playlists,
  onEdit,
  onDelete,
  onRemoveSong,
}) => {
  return (
    <>
      {playlists.map((playlist) => (
        <PlaylistItem
          key={playlist.id}
          playlist={playlist}
          onEdit={onEdit}
          onDelete={onDelete}
          onRemoveSong={onRemoveSong}
        />
      ))}
    </>
  );
};

export default PlaylistList;
