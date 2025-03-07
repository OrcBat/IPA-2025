package com.ipa.orcirecords;

import com.ipa.orcirecords.dto.ArtistDTO;
import com.ipa.orcirecords.dto.GenreDTO;
import com.ipa.orcirecords.dto.mapper.Mapper;
import com.ipa.orcirecords.model.Artist;
import com.ipa.orcirecords.model.Genre;
import com.ipa.orcirecords.repository.ArtistRepository;
import com.ipa.orcirecords.repository.GenreRepository;
import com.ipa.orcirecords.service.GenreService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class GenreServiceTest {

    @InjectMocks
    private GenreService genreService;

    @Mock
    private GenreRepository genreRepository;

    @Mock
    private ArtistRepository artistRepository;

    @Mock
    private Mapper mapper;

    @Mock
    private Genre genre;

    @Mock
    private GenreDTO genreDTO;

    @Mock
    private Artist artist;

    private final UUID genreId = UUID.randomUUID();

    @Test
    public void testGetAllGenres() {
        Genre genre1 = new Genre();
        Genre genre2 = new Genre();
        when(genreRepository.findAll()).thenReturn(Arrays.asList(genre1, genre2));
        when(mapper.genreListToDTO(Arrays.asList(genre1, genre2))).thenReturn(Arrays.asList(genreDTO, genreDTO));

        List<GenreDTO> genres = genreService.getAllGenres();

        assertNotNull(genres);
        assertEquals(2, genres.size());
        verify(genreRepository, times(1)).findAll();
        verify(mapper, times(1)).genreListToDTO(Arrays.asList(genre1, genre2));
    }

    @Test
    public void testGetGenreById_Found() {
        when(genreRepository.findById(genreId)).thenReturn(Optional.of(genre));
        when(mapper.genreToDTO(genre)).thenReturn(genreDTO);

        GenreDTO result = genreService.getGenreById(genreId);

        assertNotNull(result);
        verify(genreRepository, times(2)).findById(genreId);
        verify(mapper, times(1)).genreToDTO(genre);
    }

    @Test
    public void testGetGenreById_NotFound() {
        when(genreRepository.findById(genreId)).thenReturn(Optional.empty());

        GenreDTO result = genreService.getGenreById(genreId);

        assertNull(result);
        verify(genreRepository, times(1)).findById(genreId);
    }

    @Test
    public void testSaveGenre() {
        when(mapper.genreFromDTO(genreDTO)).thenReturn(genre);
        when(genreRepository.save(genre)).thenReturn(genre);

        Genre result = genreService.saveGenre(genreDTO);

        assertNotNull(result);
        verify(mapper, times(1)).genreFromDTO(genreDTO);
        verify(genreRepository, times(1)).save(genre);
    }

    @Test
    public void testUpdateGenre_Exists() {
        Genre genre1 = new Genre();
        genre1.setId(genreId);

        GenreDTO genreDTO1 = new GenreDTO();
        genreDTO1.setId(genreId.toString());
        genreDTO1.setName("Rock");
        genreDTO1.setArtists(List.of("Artist1"));

        when(genreRepository.findById(genreId)).thenReturn(Optional.of(genre1));
        when(genreRepository.save(genre1)).thenReturn(genre1);
        when(artistRepository.findArtistByName("Artist1")).thenReturn(Optional.of(artist));

        Genre updatedGenre = genreService.updateGenre(genreDTO1);

        assertNotNull(updatedGenre);
        assertEquals("Rock", updatedGenre.getName());
        assertTrue(updatedGenre.getArtists().contains(artist));
        verify(genreRepository, times(1)).save(updatedGenre);
    }

    @Test
    public void testUpdateGenre_NotFound() {
        when(genreDTO.getId()).thenReturn(genreId.toString());
        when(genreRepository.findById(genreId)).thenReturn(Optional.empty());

        Genre updatedGenre = genreService.updateGenre(genreDTO);

        assertNull(updatedGenre);
        verify(genreRepository, times(1)).findById(genreId);
    }

    @Test
    public void testDeleteGenre() {
        genreService.deleteGenre(genreId);

        verify(genreRepository, times(1)).deleteById(genreId);
    }
}
