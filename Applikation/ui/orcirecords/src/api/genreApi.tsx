import api from "./axiosInstance";
import { Genre } from "../models/GenreModel";

export const getGenres = async (): Promise<Genre[]> => {
  const response = await api.get("/genre");
  return response.data;
};

export const createGenre = async (genre: { name: string }) => {
  await api.post("/genre", genre);
};

export const updateGenre = async (genre: Genre) => {
  await api.put("/genre", genre);
};

export const deleteGenre = async (id: string) => {
  await api.delete(`/genre/${id}`);
};
