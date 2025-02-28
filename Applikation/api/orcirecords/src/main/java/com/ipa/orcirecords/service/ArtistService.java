package com.ipa.orcirecords.service;

import com.ipa.orcirecords.dto.ArtistDTO;
import com.ipa.orcirecords.dto.mapper.Mapper;
import com.ipa.orcirecords.model.Artist;
import com.ipa.orcirecords.model.Genre;
import com.ipa.orcirecords.model.Song;
import com.ipa.orcirecords.repository.ArtistRepository;
import com.ipa.orcirecords.repository.GenreRepository;
import com.ipa.orcirecords.repository.SongRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
public class ArtistService {

    private final ArtistRepository artistRepository;
    private final SongRepository songRepository;
    private final GenreRepository genreRepository;
    private final Mapper mapper;

    public ArtistService(ArtistRepository artistRepository, SongRepository songRepository, GenreRepository genreRepository, Mapper mapper) {
        this.artistRepository = artistRepository;
        this.songRepository = songRepository;
        this.genreRepository = genreRepository;
        this.mapper = mapper;
    }

    public List<ArtistDTO> getAllArtists() {
        return mapper.artistListToDTO(artistRepository.findAll());
    }

    public ArtistDTO getArtistById(UUID id) {
        if (artistRepository.findById(id).isPresent()) {
            return mapper.artistToDTO(artistRepository.findById(id).get());
        } else {
            log.warn("No Artist found with id {}", id);
            return null;
        }
    }

    public Artist saveArtist(ArtistDTO artistDTO) {
        return artistRepository.save(mapper.artistFromDTO(artistDTO));
    }

    public Artist updateArtist(ArtistDTO artist) {
        Optional<Artist> existingArtist = artistRepository.findById(UUID.fromString(artist.getId()));
        List<Song> songs = new ArrayList<>();
        Optional<Genre> genre = genreRepository.findByName(artist.getGenre());

        for (String songTitle : artist.getSongs()) {
            if (songRepository.findSongByTitle(songTitle).isPresent()) {
                songs.add(songRepository.findSongByTitle(songTitle).get());
            }
        }

        if (existingArtist.isPresent()) {
            existingArtist.get().setName(artist.getName());
            existingArtist.get().setGenre(genre.orElse(null));
            existingArtist.get().setSongs(songs);
            return artistRepository.save(existingArtist.get());
        } else {
            log.warn("Artist with id {} not found", artist.getId());
            return null;
        }
    }

    public void deleteArtist(UUID id) {
        artistRepository.deleteById(id);
    }
}
