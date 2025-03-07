package com.ipa.orcirecords;

import com.ipa.orcirecords.dto.SongDTO;
import com.ipa.orcirecords.dto.mapper.Mapper;
import com.ipa.orcirecords.model.song.Song;
import com.ipa.orcirecords.repository.SongRepository;
import com.ipa.orcirecords.service.SongService;
import com.ipa.orcirecords.specification.SongSpecification;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.data.jpa.domain.Specification;

import java.util.*;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class SongServiceTest {

    @InjectMocks
    private SongService songService;

    @Mock
    private SongRepository songRepository;

    @Mock
    private SongSpecification songSpecification;

    @Mock
    private Mapper mapper;

    @Mock
    private Song song;

    private final UUID songId = UUID.randomUUID();

    @Test
    public void testGetAllSongs() {
        SongDTO songDTO = new SongDTO();
        songDTO.setId(songId.toString());
        songDTO.setTitle("Test Song");

        Map<String, String> filters = new HashMap<>();

        Song song = new Song();
        song.setId(songId);
        song.setTitle("Test Song");

        List<Song> songs = List.of(song);
        when(songSpecification.getSongSpecification(filters)).thenReturn(Specification.where(null));
        when(songRepository.findAll(Specification.where(null))).thenReturn(songs);
        when(mapper.songToDTO(song)).thenReturn(songDTO);
        when(songSpecification.calculateMatchPercentage(song, filters)).thenReturn(90);

        List<SongDTO> songDTOs = songService.getAllSongs(filters);

        assertNotNull(songDTOs);
        assertEquals(1, songDTOs.size());
        assertEquals("Test Song", songDTOs.get(0).getTitle());
        assertEquals(90, songDTOs.get(0).getMatchPercentage());
    }

    @Test
    public void testGetSongById() {
        SongDTO songDTO = new SongDTO();
        songDTO.setId(songId.toString());
        songDTO.setTitle("Test Song");

        when(songRepository.findById(songId)).thenReturn(Optional.of(song));
        when(mapper.songToDTO(song)).thenReturn(songDTO);

        SongDTO result = songService.getSongById(songId);

        assertNotNull(result);
        assertEquals("Test Song", result.getTitle());
    }

    @Test
    public void testSaveSong() {
        SongDTO songDTO = new SongDTO();
        songDTO.setTitle("New Song");

        when(mapper.songFromDTO(songDTO)).thenReturn(song);
        when(songRepository.save(song)).thenReturn(song);

        songService.saveSong(songDTO);

        verify(songRepository, times(1)).save(song);
    }

    @Test
    public void testUpdateSong() {
        SongDTO songDTO = new SongDTO();
        songDTO.setId(songId.toString());
        songDTO.setTitle("Updated Song");

        Song existingSong = new Song();
        existingSong.setId(songId);
        existingSong.setTitle("Updated Song");

        when(songRepository.findById(songId)).thenReturn(Optional.of(existingSong));
        when(mapper.songFromDTO(songDTO)).thenReturn(existingSong);
        when(songRepository.save(existingSong)).thenReturn(existingSong);

        songService.updateSong(songDTO);

        verify(songRepository, times(1)).save(existingSong);
        assertEquals("Updated Song", existingSong.getTitle());
    }

    @Test
    public void testDeleteSong() {
        songService.deleteSong(songId);

        verify(songRepository, times(1)).deleteById(songId);
    }

    @Test
    public void testGetSongById_NotFound() {
        when(songRepository.findById(songId)).thenReturn(Optional.empty());

        SongDTO result = songService.getSongById(songId);

        assertNull(result);
    }

    @Test
    public void testUpdateSong_SongNotFound() {
        SongDTO songDTO = new SongDTO();
        songDTO.setId(songId.toString());
        songDTO.setTitle("Updated Song");

        when(songRepository.findById(songId)).thenReturn(Optional.empty());

        songService.updateSong(songDTO);

        verify(songRepository, never()).save(any(Song.class));
    }
}
