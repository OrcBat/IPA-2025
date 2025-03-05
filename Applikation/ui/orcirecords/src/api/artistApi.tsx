import api from "./axiosInstance";
import { Artist } from "../models/ArtistModel";

export const getArtists = async (): Promise<Artist[]> => {
  const response = await api.get("/artist");
  return response.data;
};

export const getArtistById = async (id: string): Promise<Artist> => {
  const response = await api.get(`/artist/${id}`);
  return response.data;
};

export const createArtist = async (artist: Artist): Promise<void> => {
  await api.post("/artist", artist);
};

export const updateArtist = async (artist: Artist): Promise<void> => {
  await api.put("/artist", artist);
};

export const deleteArtist = async (id: string): Promise<void> => {
  await api.delete(`/artist/${id}`);
};
