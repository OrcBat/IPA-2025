package com.ipa.orcirecords;

import com.ipa.orcirecords.dto.ArtistDTO;
import com.ipa.orcirecords.dto.mapper.Mapper;
import com.ipa.orcirecords.model.Artist;
import com.ipa.orcirecords.model.Genre;
import com.ipa.orcirecords.model.song.Song;
import com.ipa.orcirecords.repository.ArtistRepository;
import com.ipa.orcirecords.repository.GenreRepository;
import com.ipa.orcirecords.repository.SongRepository;
import com.ipa.orcirecords.service.ArtistService;
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
public class ArtistServiceTest {

    @InjectMocks
    private ArtistService artistService;

    @Mock
    private ArtistRepository artistRepository;

    @Mock
    private SongRepository songRepository;

    @Mock
    private GenreRepository genreRepository;

    @Mock
    private Mapper mapper;

    @Mock
    private Artist artist;

    @Mock
    private ArtistDTO artistDTO;

    @Mock
    private Song song;

    @Mock
    private Genre genre;

    private final UUID artistId = UUID.randomUUID();

    @Test
    public void testGetAllArtists() {
        Artist artist1 = new Artist();
        Artist artist2 = new Artist();
        when(artistRepository.findAll()).thenReturn(Arrays.asList(artist1, artist2));
        when(mapper.artistListToDTO(Arrays.asList(artist1, artist2))).thenReturn(Arrays.asList(artistDTO, artistDTO));

        List<ArtistDTO> artists = artistService.getAllArtists();

        assertNotNull(artists);
        assertEquals(2, artists.size());
        verify(artistRepository, times(1)).findAll();
        verify(mapper, times(1)).artistListToDTO(Arrays.asList(artist1, artist2));
    }

    @Test
    public void testGetArtistById_Found() {
        when(artistRepository.findById(artistId)).thenReturn(Optional.of(artist));
        when(mapper.artistToDTO(artist)).thenReturn(artistDTO);

        ArtistDTO result = artistService.getArtistById(artistId);

        assertNotNull(result);
        verify(artistRepository, times(2)).findById(artistId);
        verify(mapper, times(1)).artistToDTO(artist);
    }

    @Test
    public void testGetArtistById_NotFound() {
        when(artistRepository.findById(artistId)).thenReturn(Optional.empty());

        ArtistDTO result = artistService.getArtistById(artistId);

        assertNull(result);
        verify(artistRepository, times(1)).findById(artistId);
    }

    @Test
    public void testSaveArtist() {
        when(mapper.artistFromDTO(artistDTO)).thenReturn(artist);
        when(artistRepository.save(artist)).thenReturn(artist);

        Artist result = artistService.saveArtist(artistDTO);

        assertNotNull(result);
        verify(mapper, times(1)).artistFromDTO(artistDTO);
        verify(artistRepository, times(1)).save(artist);
    }

    @Test
    public void testUpdateArtist_Exists() {
        UUID artistUUID = UUID.randomUUID();
        Artist artist1 = new Artist();
        artist1.setId(artistUUID);

        ArtistDTO artistDTO1 = new ArtistDTO();
        artistDTO1.setId(artistUUID.toString());
        artistDTO1.setName("ArtistName");
        artistDTO1.setGenre("Rock");
        artistDTO1.setSongs(List.of("Song1"));

        when(artistRepository.findById(artistUUID)).thenReturn(Optional.of(artist1));
        when(artistRepository.save(artist1)).thenReturn(artist1);

        when(genreRepository.findByName("Rock")).thenReturn(Optional.of(genre));
        when(songRepository.findSongByTitle("Song1")).thenReturn(Optional.of(song));

        Artist updatedArtist = artistService.updateArtist(artistDTO1);

        assertEquals("ArtistName", updatedArtist.getName());
        assertEquals(genre, updatedArtist.getGenre());
        assertTrue(updatedArtist.getSongs().contains(song));

        verify(artistRepository, times(1)).save(updatedArtist);
    }

    @Test
    public void testUpdateArtist_NotFound() {
        when(artistDTO.getId()).thenReturn(artistId.toString());
        when(artistRepository.findById(artistId)).thenReturn(Optional.empty());

        Artist updatedArtist = artistService.updateArtist(artistDTO);

        assertNull(updatedArtist);
        verify(artistRepository, times(1)).findById(artistId);
    }

    @Test
    public void testDeleteArtist() {
        artistService.deleteArtist(artistId);

        verify(artistRepository, times(1)).deleteById(artistId);
    }
}
