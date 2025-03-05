import { Song } from "./SongModel";
export interface Playlist {
  id: string;
  name: string;
  description: string;
  songs: Song[];
  ownerId: string;
}
