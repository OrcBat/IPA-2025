package com.ipa.orcirecords.controller;

import com.ipa.orcirecords.dto.PlaylistDTO;
import com.ipa.orcirecords.dto.PlaylistInfoDTO;
import com.ipa.orcirecords.model.user.User;
import com.ipa.orcirecords.repository.UserRepository;
import com.ipa.orcirecords.service.PlaylistService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.springframework.http.HttpStatus.OK;

@Controller
@RequestMapping("/api/playlist")
public class PlaylistController {

    private final PlaylistService playlistService;
    private final UserRepository userRepository;

    public PlaylistController(PlaylistService playlistService, UserRepository userRepository) {
        this.playlistService = playlistService;
        this.userRepository = userRepository;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<PlaylistDTO>> getAllPlaylists() {
        return new ResponseEntity<>(playlistService.getAllPlaylists(), OK);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/current")
    public ResponseEntity<List<PlaylistDTO>> getPlaylistForCurrentUser(Principal principal) {
        Optional<User> currentUser = userRepository.findByUsername(principal.getName());
        return new ResponseEntity<>(playlistService.getPlaylistsForCurrentUser(currentUser), OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<PlaylistDTO> getPlaylistById(@PathVariable String id) {
        return new ResponseEntity<>(playlistService.getPlaylistById(UUID.fromString(id)), OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @PostMapping
    public ResponseEntity<Void> createPlaylist(@RequestBody PlaylistInfoDTO playlist, Principal principal) {
        Optional<User> currentUser = userRepository.findByUsername(principal.getName());
        playlistService.savePlaylist(playlist, currentUser);
        return new ResponseEntity<>(OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @PutMapping("/{id}")
    public ResponseEntity<Void> updatePlaylist(@RequestBody PlaylistInfoDTO playlist, @PathVariable String id, Principal principal) {
        Optional<User> currentUser = userRepository.findByUsername(principal.getName());
        playlistService.updatePlaylist(playlist, id, currentUser);
        return new ResponseEntity<>(OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @PutMapping("/add/{songId}/{playlistId}")
    public ResponseEntity<Void> addSongToPlaylist(@PathVariable String songId,
                                                  @PathVariable String playlistId,
                                                  Principal principal) {
        Optional<User> currentUser = userRepository.findByUsername(principal.getName());
        playlistService.addSongToPlaylist(UUID.fromString(songId), UUID.fromString(playlistId), currentUser);
        return new ResponseEntity<>(OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @PutMapping("/remove/{songId}/{playlistId}")
    public ResponseEntity<Void> removeSongFromPlaylist(@PathVariable String songId,
                                                       @PathVariable String playlistId,
                                                       Principal principal) {
        Optional<User> currentUser = userRepository.findByUsername(principal.getName());
        playlistService.removeSongFromPlaylist(UUID.fromString(songId), UUID.fromString(playlistId), currentUser);
        return new ResponseEntity<>(OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlaylist(@PathVariable String id, Principal principal) {
        Optional<User> currentUser = userRepository.findByUsername(principal.getName());
        playlistService.deletePlaylist(UUID.fromString(id), currentUser);
        return new ResponseEntity<>(OK);
    }
}
