import React from "react";
import ArtistItem from "../molecules/ArtistItem";
import { Artist } from "../../models/ArtistModel";

interface ArtistListProps {
  artists: Artist[];
  onEdit: (artist: Artist) => void;
  onDelete: (id: string) => void;
  isAdmin: boolean;
}

const ArtistList: React.FC<ArtistListProps> = ({
  artists,
  onEdit,
  onDelete,
  isAdmin,
}) => {
  return (
    <>
      {artists.map((artist) => (
        <ArtistItem
          key={artist.id}
          artist={artist}
          onEdit={isAdmin ? () => onEdit(artist) : undefined}
          onDelete={isAdmin ? () => onDelete(artist.id) : undefined}
        />
      ))}
    </>
  );
};

export default ArtistList;
