package com.ipa.orcirecords.controller;

import com.ipa.orcirecords.dto.SongDTO;
import com.ipa.orcirecords.service.SongService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/song")
public class SongController {

    private final SongService songService;

    public SongController(SongService songService) {
        this.songService = songService;
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping
    public ResponseEntity<List<SongDTO>> getAllSongs(@RequestParam(required = false) Map<String, String> filters) {
        return new ResponseEntity<>(songService.getAllSongs(filters), OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping("/{id}")
    public ResponseEntity<SongDTO> getSongById(@PathVariable String id) {
        return new ResponseEntity<>(songService.getSongById(UUID.fromString(id)), OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<Void> createSong(@RequestBody SongDTO song) {
        songService.saveSong(song);
        return new ResponseEntity<>(OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping
    public ResponseEntity<Void> updateSong(@RequestBody SongDTO song) {
        songService.updateSong(song);
        return new ResponseEntity<>(OK);

    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSong(@PathVariable String id) {
        songService.deleteSong(UUID.fromString(id));
        return new ResponseEntity<>(OK);
    }
}
