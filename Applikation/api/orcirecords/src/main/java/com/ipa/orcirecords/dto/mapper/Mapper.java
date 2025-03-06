package com.ipa.orcirecords.dto.mapper;

import com.ipa.orcirecords.dto.*;
import com.ipa.orcirecords.model.Artist;
import com.ipa.orcirecords.model.Genre;
import com.ipa.orcirecords.model.Playlist;
import com.ipa.orcirecords.model.song.Song;
import com.ipa.orcirecords.model.user.User;
import com.ipa.orcirecords.repository.ArtistRepository;
import com.ipa.orcirecords.repository.GenreRepository;
import com.ipa.orcirecords.repository.SongRepository;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class Mapper {

    private final GenreRepository genreRepository;
    private final SongRepository songRepository;
    private final ArtistRepository artistRepository;

    public Mapper(GenreRepository genreRepository, SongRepository songRepository, ArtistRepository artistRepository) {
        this.genreRepository = genreRepository;
        this.songRepository = songRepository;
        this.artistRepository = artistRepository;
    }

    public List<SongDTO> songListToDTO(List<Song> songs) {
        List<SongDTO> songDTOS = new ArrayList<>();

        for (Song song : songs) {
            List<String> genreIds = new ArrayList<>();
            for (Genre genre : song.getGenres()) {
                genreIds.add(genre.getName());
            }
            SongDTO songDTO = new SongDTO();
            songDTO.setId(song.getId().toString());
            songDTO.setTitle(song.getTitle());
            songDTO.setReleaseDate(song.getReleaseDate());
            songDTO.setPlays(song.getPlays());
            songDTO.setMood(song.getMood());
            songDTO.setEnergy(song.getEnergy());
            songDTO.setGenres(genreIds);
            songDTO.setArtist(song.getArtist().getName());
            songDTOS.add(songDTO);
        }

        return songDTOS;
    }

    public SongDTO songToDTO(Song song) {
        List<String> genreIds = new ArrayList<>();

        for (Genre genre : song.getGenres()) {
            genreIds.add(genre.getName());
        }

        SongDTO songDTO = new SongDTO();
        songDTO.setId(song.getId().toString());
        songDTO.setTitle(song.getTitle());
        songDTO.setReleaseDate(song.getReleaseDate());
        songDTO.setMood(song.getMood());
        songDTO.setEnergy(song.getEnergy());
        songDTO.setPlays(song.getPlays());
        songDTO.setArtist(song.getArtist().getName());
        songDTO.setGenres(genreIds);

        return songDTO;
    }

    public Song songFromDTO(SongDTO songDTO) {
        List<Genre> songGenres = new ArrayList<>();
        Optional<Artist> artist = artistRepository.findArtistByName(songDTO.getArtist());

        for (String genreName : songDTO.getGenres()) {
            Optional<Genre> genre = genreRepository.findByName(genreName);
            genre.ifPresent(songGenres::add);
        }

        Song song = new Song();
        song.setTitle(songDTO.getTitle());
        song.setGenres(songGenres);
        song.setReleaseDate(songDTO.getReleaseDate());
        song.setMood(songDTO.getMood());
        song.setEnergy(songDTO.getEnergy());
        song.setPlays(songDTO.getPlays());
        song.setArtist(artist.orElse(null));

        return song;
    }

    public List<ArtistDTO> artistListToDTO(List<Artist> artists) {
        List<ArtistDTO> artistDTOS = new ArrayList<>();

        for (Artist artist : artists) {
            List<Song> songs = artist.getSongs();
            List<String> songIds = new ArrayList<>();
            for (Song song : songs) {
                songIds.add(song.getTitle());
            }
            ArtistDTO artistDTO = new ArtistDTO();
            artistDTO.setId(artist.getId().toString());
            artistDTO.setName(artist.getName());
            artistDTO.setGenre(artist.getGenre() != null ? artist.getGenre().getName() : null);
            artistDTO.setSongs(songIds);
            artistDTOS.add(artistDTO);
        }

        return artistDTOS;
    }

    public ArtistDTO artistToDTO(Artist artist) {
        List<Song> songs = artist.getSongs();
        List<String> songIds = new ArrayList<>();
        for (Song song : songs) {
            songIds.add(song.getTitle());
        }

        ArtistDTO artistDTO = new ArtistDTO();
        artistDTO.setId(artist.getId().toString());
        artistDTO.setName(artist.getName());
        artistDTO.setGenre(artist.getGenre().getName());
        artistDTO.setSongs(songIds);

        return artistDTO;
    }

    public Artist artistFromDTO(ArtistDTO artistDTO) {
        Optional<Genre> genre = genreRepository.findByName(artistDTO.getGenre());
        List<Song> artistSongs = new ArrayList<>();

        for (String songTitle : artistDTO.getSongs()) {
            Optional<Song> song = songRepository.findSongByTitle(songTitle);

            if (song.isPresent() && song.get().getArtist() != null) {
                throw new IllegalArgumentException("Song '" + songTitle + "' is already assigned to another artist.");
            }

            song.ifPresent(artistSongs::add);
        }

        Artist artist = new Artist();
        artist.setName(artistDTO.getName());
        artist.setGenre(genre.orElse(null));
        artist.setSongs(artistSongs);

        return artist;
    }

    public List<GenreDTO> genreListToDTO(List<Genre> genres) {
        List<GenreDTO> genreDTOS = new ArrayList<>();

        for (Genre genre : genres) {
            List<Artist> artists = genre.getArtists();
            List<String> artistNames = new ArrayList<>();
            for (Artist artist : artists) {
                artistNames.add(artist.getName());
            }
            GenreDTO genreDTO = new GenreDTO();
            genreDTO.setId(genre.getId().toString());
            genreDTO.setName(genre.getName());
            genreDTO.setArtists(artistNames);
            genreDTOS.add(genreDTO);
        }

        return genreDTOS;
    }

    public GenreDTO genreToDTO(Genre genre) {
        List<Artist> artists = genre.getArtists();
        List<String> artistNames = new ArrayList<>();
        for (Artist artist : artists) {
            artistNames.add(artist.getName());
        }

        GenreDTO genreDTO = new GenreDTO();
        genreDTO.setId(genre.getId().toString());
        genreDTO.setName(genre.getName());
        genreDTO.setArtists(artistNames);

        return genreDTO;
    }

    public Genre genreFromDTO(GenreDTO genreDTO) {
        List<Artist> genreArtists = new ArrayList<>();
        Genre genre = new Genre();

        if (genreDTO.getArtists() != null) {
            for (String artistName : genreDTO.getArtists()) {
                Optional<Artist> artist = artistRepository.findArtistByName(artistName);
                artist.ifPresent(genreArtists::add);
            }
            genre.setArtists(genreArtists);
        }

        genre.setName(genreDTO.getName());

        return genre;
    }

    public List<PlaylistDTO> playlistListToDTO(List<Playlist> playlists) {
        List<PlaylistDTO> playlistDTOS = new ArrayList<>();

        for (Playlist playlist : playlists) {
            PlaylistDTO playlistDTO = new PlaylistDTO();
            playlistDTO.setId(playlist.getId().toString());
            playlistDTO.setName(playlist.getName());
            playlistDTO.setDescription(playlist.getDescription());
            playlistDTO.setOwnerName(playlist.getUser().getUsername());
            playlistDTO.setSongs(songListToDTO(playlist.getSongs()));

            playlistDTOS.add(playlistDTO);
        }

        return playlistDTOS;
    }

    public PlaylistDTO playlistToDTO(Playlist playlist) {
        PlaylistDTO playlistDTO = new PlaylistDTO();
        playlistDTO.setId(playlist.getId().toString());
        playlistDTO.setName(playlist.getName());
        playlistDTO.setDescription(playlist.getDescription());
        playlistDTO.setOwnerName(playlist.getUser().getUsername());
        playlistDTO.setSongs(songListToDTO(playlist.getSongs()));

        return playlistDTO;
    }

    public Playlist playlistFromInfoDTO(PlaylistInfoDTO playlistInfoDTO, User currentUser) {
        Playlist playlist = new Playlist();
        playlist.setName(playlistInfoDTO.getName());
        playlist.setDescription(playlistInfoDTO.getDescription());
        playlist.setUser(currentUser);
        playlist.setSongs(playlist.getSongs());

        return playlist;
    }
}
