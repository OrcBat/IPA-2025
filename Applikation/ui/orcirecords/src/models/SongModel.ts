export interface Song {
  id: string;
  title: string;
  artist: string;
  genres: string[];
  mood: string;
  energy: string;
  releaseDate: string;
  plays: number;
  matchPercentage: number;
}
