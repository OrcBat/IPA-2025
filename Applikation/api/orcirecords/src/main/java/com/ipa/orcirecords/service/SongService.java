package com.ipa.orcirecords.service;

import com.ipa.orcirecords.dto.SongDTO;
import com.ipa.orcirecords.dto.mapper.Mapper;
import com.ipa.orcirecords.model.song.Song;
import com.ipa.orcirecords.repository.SongRepository;
import com.ipa.orcirecords.specification.SongSpecification;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
public class SongService {

    private final SongRepository songRepository;
    private final SongSpecification songSpecification;
    private final Mapper mapper;

    public SongService(SongRepository songRepository, SongSpecification songSpecification, Mapper mapper) {
        this.songRepository = songRepository;
        this.songSpecification = songSpecification;
        this.mapper = mapper;
    }

    public List<SongDTO> getAllSongs(Map<String, String> filters) {
        Specification<Song> specification = songSpecification.getSongSpecification(filters);
        List<Song> songs = songRepository.findAll(specification);

        return songs.stream()
                .map(song -> {
                    SongDTO dto = mapper.songToDTO(song);
                    dto.setMatchPercentage(songSpecification.calculateMatchPercentage(song, filters));
                    return dto;
                })
                .sorted(Comparator.comparingInt(SongDTO::getMatchPercentage).reversed())
                .collect(Collectors.toList());
    }

    public SongDTO getSongById(UUID id) {
        if (songRepository.findById(id).isPresent()) {
            return mapper.songToDTO(songRepository.findById(id).get());
        } else {
            log.warn("Song not found");
            return null;
        }
    }

    public void saveSong(SongDTO songDTO) {
        songRepository.save(mapper.songFromDTO(songDTO));
    }

    public void updateSong(SongDTO songDTO) {
        Song song = mapper.songFromDTO(songDTO);
        Optional<Song> existingSong = songRepository.findById(UUID.fromString(songDTO.getId()));
        if (existingSong.isPresent()) {
            existingSong.get().setTitle(song.getTitle());
            existingSong.get().setReleaseDate(song.getReleaseDate());
            existingSong.get().setMood(song.getMood());
            existingSong.get().setEnergy(song.getEnergy());
            existingSong.get().setArtist(song.getArtist());
            existingSong.get().setGenres(song.getGenres());
            existingSong.get().setPlays(song.getPlays());
            songRepository.save(existingSong.get());
        } else {
            log.warn("Song with id {} not found", songDTO.getId());
        }
    }

    public void deleteSong(UUID id) {
        songRepository.deleteById(id);
    }
}
