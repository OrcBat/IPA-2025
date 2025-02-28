package com.ipa.orcirecords.controller;

import com.ipa.orcirecords.dto.GenreDTO;
import com.ipa.orcirecords.service.GenreService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

import static org.springframework.http.HttpStatus.OK;

@Controller
@RequestMapping("/api/genre")
public class GenreController {

    private final GenreService genreService;

    public GenreController(GenreService genreService) {
        this.genreService = genreService;
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping
    public ResponseEntity<List<GenreDTO>> getAllGenres() {
        return new ResponseEntity<>(genreService.getAllGenres(), OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping("/{id}")
    public ResponseEntity<GenreDTO> getGenreById(@PathVariable String id) {
        return new ResponseEntity<>(genreService.getGenreById(UUID.fromString(id)), OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<Void> createGenre(@RequestBody GenreDTO genre) {
        genreService.saveGenre(genre);
        return new ResponseEntity<>(OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Void> updateGenre(@RequestBody GenreDTO genre, @PathVariable String id) {
        genreService.updateGenre(genre, id);
        return new ResponseEntity<>(OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGenre(@PathVariable String id) {
        genreService.deleteGenre(UUID.fromString(id));
        return new ResponseEntity<>(OK);
    }
}
