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

        return mapper.songListToDTO(songs);
    }

    public SongDTO getSongById(UUID id) {
        if (songRepository.findById(id).isPresent()) {
            return mapper.songToDTO(songRepository.findById(id).get());
        } else {
            log.warn("Song not found");
            return null;
        }
    }

    public Song saveSong(SongDTO songDTO) {
        return songRepository.save(mapper.songFromDTO(songDTO));
    }

    public Song updateSong(SongDTO songDTO) {
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
            return songRepository.save(existingSong.get());
        } else {
            log.warn("Song with id {} not found", songDTO.getId());
            return null;
        }
    }

    public void deleteSong(UUID id) {
        songRepository.deleteById(id);
    }
}
