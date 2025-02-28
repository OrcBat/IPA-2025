package com.ipa.orcirecords.controller;

import com.ipa.orcirecords.dto.ArtistDTO;
import com.ipa.orcirecords.service.ArtistService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

import static org.springframework.http.HttpStatus.OK;

@Controller
@RequestMapping("/api/artist")
public class ArtistController {

    private final ArtistService artistService;

    public ArtistController(ArtistService artistService) {
        this.artistService = artistService;
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping
    public ResponseEntity<List<ArtistDTO>> getAllArtists() {
        return new ResponseEntity<>(artistService.getAllArtists(), OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping("/{id}")
    public ResponseEntity<ArtistDTO> getArtistById(@PathVariable String id) {
        return new ResponseEntity<>(artistService.getArtistById(UUID.fromString(id)), OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<Void> createArtist(@RequestBody ArtistDTO artist) {
        artistService.saveArtist(artist);
        return new ResponseEntity<>(OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping
    public ResponseEntity<Void> updateArtist(@RequestBody ArtistDTO artist) {
        artistService.updateArtist(artist);
        return new ResponseEntity<>(OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArtist(@PathVariable String id) {
        artistService.deleteArtist(UUID.fromString(id));
        return new ResponseEntity<>(OK);
    }
}
