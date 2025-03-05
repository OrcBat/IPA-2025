import { Song } from "../models/SongModel";
import api from "./axiosInstance";

export const getSongs = async (
  filters: Record<string, string> = {}
): Promise<Song[]> => {
  const response = await api.get("/song", { params: filters });
  return response.data;
};

export const createSong = async (songData: Song) => {
  const response = await api.post("/song", songData);
  return response.data;
};

export const updateSong = async (songData: Song) => {
  const response = await api.put("/song", songData);
  return response.data;
};

export const deleteSong = async (id: string) => {
  await api.delete(`/song/${id}`);
};
