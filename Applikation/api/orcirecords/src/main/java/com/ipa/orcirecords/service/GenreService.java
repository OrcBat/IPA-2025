package com.ipa.orcirecords.service;

import com.ipa.orcirecords.dto.GenreDTO;
import com.ipa.orcirecords.dto.mapper.Mapper;
import com.ipa.orcirecords.model.Artist;
import com.ipa.orcirecords.model.Genre;
import com.ipa.orcirecords.repository.ArtistRepository;
import com.ipa.orcirecords.repository.GenreRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
public class GenreService {

    private final GenreRepository genreRepository;
    private final ArtistRepository artistRepository;
    private final Mapper mapper;

    public GenreService(GenreRepository genreRepository, ArtistRepository artistRepository, Mapper mapper) {
        this.genreRepository = genreRepository;
        this.artistRepository = artistRepository;
        this.mapper = mapper;
    }

    public List<GenreDTO> getAllGenres() {
        return mapper.genreListToDTO(genreRepository.findAll());
    }

    public GenreDTO getGenreById(UUID id) {
        if (genreRepository.findById(id).isPresent()) {
            return mapper.genreToDTO(genreRepository.findById(id).get());
        } else {
            log.warn("No genre found");
            return null;
        }
    }

    public Genre saveGenre(GenreDTO genreDTO) {
        return genreRepository.save(mapper.genreFromDTO(genreDTO));
    }

    public Genre updateGenre(GenreDTO genreDTO) {
        Optional<Genre> existingGenre = genreRepository.findById(UUID.fromString(genreDTO.getId()));
        List<Artist> genreArtists = new ArrayList<>();

        for (String artistName : genreDTO.getArtists()) {
            if (artistRepository.findArtistByName(artistName).isPresent()) {
                genreArtists.add(artistRepository.findArtistByName(artistName).get());
            }
        }

        if (existingGenre.isPresent()) {
            existingGenre.get().setName(genreDTO.getName());
            existingGenre.get().setArtists(genreArtists);
            return genreRepository.save(existingGenre.get());
        } else {
            log.warn("Genre with id {} not found", genreDTO);
            return null;
        }
    }

    public void deleteGenre(UUID id) {
        genreRepository.deleteById(id);
    }
}
