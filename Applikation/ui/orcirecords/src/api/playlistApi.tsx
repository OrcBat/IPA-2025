import { Playlist } from "../models/PlaylistModel";
import api from "./axiosInstance";

export const getPlaylists = async (): Promise<Playlist[]> => {
  const response = await api.get("/playlist");
  return response.data;
};

export const getCurrentUserPlaylists = async (): Promise<Playlist[]> => {
  const response = await api.get("/playlist/current");
  return response.data;
};

export const getPlaylistById = async (id: string): Promise<Playlist> => {
  const response = await api.get(`/playlist/${id}`);
  return response.data;
};

export const createPlaylist = async (playlist: {
  name: string;
  description: string;
}) => {
  await api.post("/playlist", playlist);
};

export const updatePlaylist = async (playlist: {
  id: string;
  name: string;
  description: string;
}) => {
  await api.put("/playlist", playlist);
};

export const deletePlaylist = async (id: string) => {
  await api.delete(`/playlist/${id}`);
};

export const addSongToPlaylist = async (songId: string, playlistId: string) => {
  await api.put(`/playlist/${playlistId}/add-song/${songId}`);
};

export const removeSongFromPlaylist = async (
  songId: string,
  playlistId: string
) => {
  await api.put(`/playlist/${playlistId}/remove-song/${songId}`);
};
