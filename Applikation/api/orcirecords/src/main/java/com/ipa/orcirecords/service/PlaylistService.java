package com.ipa.orcirecords.service;

import com.ipa.orcirecords.dto.PlaylistDTO;
import com.ipa.orcirecords.dto.PlaylistInfoDTO;
import com.ipa.orcirecords.dto.mapper.Mapper;
import com.ipa.orcirecords.model.Playlist;
import com.ipa.orcirecords.model.Song;
import com.ipa.orcirecords.model.user.Role;
import com.ipa.orcirecords.model.user.User;
import com.ipa.orcirecords.repository.PlaylistRepository;
import com.ipa.orcirecords.repository.SongRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
public class PlaylistService {

    private final PlaylistRepository playlistRepository;
    private final SongRepository songRepository;
    private final Mapper mapper;

    public PlaylistService(PlaylistRepository playlistRepository, SongRepository songRepository, Mapper mapper) {
        this.playlistRepository = playlistRepository;
        this.songRepository = songRepository;
        this.mapper = mapper;
    }

    public List<PlaylistDTO> getAllPlaylists() {
        return mapper.playlistListToDTO(playlistRepository.findAll());
    }

    public List<PlaylistDTO> getPlaylistsForCurrentUser(Optional<User> currentUser) {
        if (currentUser.isPresent()) {
            return mapper.playlistListToDTO(playlistRepository.findByUserId(currentUser.get().getId()));
        } else {
            log.warn("User not found");
            return null;
        }
    }

    public PlaylistDTO getPlaylistById(UUID id) {
        if (playlistRepository.findById(id).isPresent()) {
            return mapper.playlistToDTO(playlistRepository.findById(id).get());
        } else {
            log.warn("Playlist not found");
            return null;
        }
    }

    public Playlist savePlaylist(PlaylistInfoDTO playlist, Optional<User> currentUser) {
        if (currentUser.isPresent()) {
            return playlistRepository.save(mapper.playlistFromInfoDTO(playlist, currentUser.get()));
        } else {
            log.warn("User not found");
            return null;
        }
    }

    public void deletePlaylist(UUID id, Optional<User> currentUser) {
        Optional<Playlist> existingPlaylist = playlistRepository.findById(id);
        if (existingPlaylist.isPresent() && currentUser.isPresent()) {
            if (existingPlaylist.get().getUser().getId().equals(currentUser.get().getId()) || currentUser.get().getRole().equals(Role.ADMIN)) {
                playlistRepository.deleteById(id);
            } else {
                log.warn("Not authorized to delete this playlist");
            }
        }

    }

    public Playlist updatePlaylist(PlaylistInfoDTO playlist, String id, Optional<User> currentUser) {
        Optional<Playlist> existingPlaylist = playlistRepository.findById(UUID.fromString(id));
        if (existingPlaylist.isPresent() && currentUser.isPresent()) {
            if (existingPlaylist.get().getUser().getId().equals(currentUser.get().getId()) || currentUser.get().getRole().equals(Role.ADMIN)) {
                existingPlaylist.get().setName(playlist.getName());
                existingPlaylist.get().setDescription(playlist.getDescription());
                return playlistRepository.save(existingPlaylist.get());
            } else {
                log.warn("Not authorized to edit this playlist");
                return null;
            }
        } else {
            log.warn("Playlist with id {} not found", id);
            return null;
        }
    }

    public void addSongToPlaylist(UUID songId, UUID playlistId, Optional<User> currentUser) {
        Optional<Playlist> playlist = playlistRepository.findById(playlistId);
        Optional<Song> song = songRepository.findById(songId);
        if (playlist.isPresent() && song.isPresent() && currentUser.isPresent()) {
            if (!playlist.get().getSongs().contains(song.get())) {
                if (playlist.get().getUser().getId().equals(currentUser.get().getId()) || currentUser.get().getRole().equals(Role.ADMIN)) {
                    playlist.get().getSongs().add(song.get());
                    playlistRepository.save(playlist.get());
                } else {
                    log.warn("Not authorized to add song to this playlist");
                }
            } else {
                log.error("Song {} already exists in playlist {}", song.get().getTitle(), playlist.get().getName());
            }
        } else {
            log.error("Song could not be added to the playlist");
        }
    }

    public void removeSongFromPlaylist(UUID songId, UUID playlistId, Optional<User> currentUser) {
        Optional<Playlist> playlist = playlistRepository.findById(playlistId);
        Optional<Song> song = songRepository.findById(songId);
        if (playlist.isPresent() && song.isPresent() && currentUser.isPresent()) {
            if (playlist.get().getUser().getId().equals(currentUser.get().getId()) || currentUser.get().getRole().equals(Role.ADMIN)) {
                playlist.get().getSongs().removeIf(songElem -> songElem.getId().equals(songId));
                playlistRepository.save(playlist.get());
            } else {
                log.warn("Not authorized to remove songs from this playlist");
            }
        } else {
            log.error("Song could not be added to the playlist");
        }
    }
}
