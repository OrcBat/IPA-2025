import React from "react";
import GenreItem from "../molecules/GenreItem";
import { Genre } from "../../models/GenreModel";

interface GenreListProps {
  genres: Genre[];
  onEdit: (genre: Genre) => void;
  onDelete: (id: string) => void;
  isAdmin: boolean;
}

const GenreList: React.FC<GenreListProps> = ({
  genres,
  onEdit,
  onDelete,
  isAdmin,
}) => {
  return (
    <>
      {genres.map((genre) => (
        <GenreItem
          key={genre.id}
          genre={genre}
          onEdit={isAdmin ? () => onEdit(genre) : undefined}
          onDelete={isAdmin ? () => onDelete(genre.id) : undefined}
        />
      ))}
    </>
  );
};

export default GenreList;
