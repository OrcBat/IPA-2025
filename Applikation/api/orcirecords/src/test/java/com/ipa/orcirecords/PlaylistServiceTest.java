package com.ipa.orcirecords;

import com.ipa.orcirecords.dto.PlaylistDTO;
import com.ipa.orcirecords.dto.PlaylistInfoDTO;
import com.ipa.orcirecords.dto.mapper.Mapper;
import com.ipa.orcirecords.model.Playlist;
import com.ipa.orcirecords.model.song.Song;
import com.ipa.orcirecords.model.user.User;
import com.ipa.orcirecords.repository.PlaylistRepository;
import com.ipa.orcirecords.repository.SongRepository;
import com.ipa.orcirecords.service.PlaylistService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class PlaylistServiceTest {

    @InjectMocks
    private PlaylistService playlistService;

    @Mock
    private PlaylistRepository playlistRepository;

    @Mock
    private SongRepository songRepository;

    @Mock
    private Mapper mapper;

    @Mock
    private Playlist playlist;

    @Mock
    private Song song;

    private final UUID playlistId = UUID.randomUUID();
    private final UUID songId = UUID.randomUUID();
    private final UUID userId = UUID.randomUUID();

    @Test
    public void testGetAllPlaylists() {
        PlaylistDTO playlistDTO = new PlaylistDTO();
        playlistDTO.setId(playlistId.toString());
        playlistDTO.setName("Test Playlist");

        List<Playlist> playlists = List.of(playlist);
        when(playlistRepository.findAll()).thenReturn(playlists);
        when(mapper.playlistListToDTO(playlists)).thenReturn(List.of(playlistDTO));

        List<PlaylistDTO> playlistDTOs = playlistService.getAllPlaylists();

        assertNotNull(playlistDTOs);
        assertEquals(1, playlistDTOs.size());
        assertEquals("Test Playlist", playlistDTOs.get(0).getName());
    }

    @Test
    public void testGetPlaylistsForCurrentUser() {
        PlaylistDTO playlistDTO = new PlaylistDTO();
        playlistDTO.setId(playlistId.toString());
        playlistDTO.setName("User Playlist");

        User currentUser = new User();
        currentUser.setId(userId);

        List<Playlist> playlists = List.of(playlist);
        when(playlistRepository.findByUserId(userId)).thenReturn(playlists);
        when(mapper.playlistListToDTO(playlists)).thenReturn(List.of(playlistDTO));

        List<PlaylistDTO> playlistDTOs = playlistService.getPlaylistsForCurrentUser(Optional.of(currentUser));

        assertNotNull(playlistDTOs);
        assertEquals(1, playlistDTOs.size());
        assertEquals("User Playlist", playlistDTOs.get(0).getName());
    }

    @Test
    public void testGetPlaylistById() {
        PlaylistDTO playlistDTO = new PlaylistDTO();
        playlistDTO.setId(playlistId.toString());
        playlistDTO.setName("Playlist by ID");

        when(playlistRepository.findById(playlistId)).thenReturn(Optional.of(playlist));
        when(mapper.playlistToDTO(playlist)).thenReturn(playlistDTO);

        PlaylistDTO result = playlistService.getPlaylistById(playlistId);

        assertNotNull(result);
        assertEquals("Playlist by ID", result.getName());
    }

    @Test
    public void testSavePlaylist() {
        PlaylistInfoDTO playlistInfoDTO = new PlaylistInfoDTO();
        playlistInfoDTO.setName("New Playlist");
        playlistInfoDTO.setDescription("Test description");

        User currentUser = new User();
        currentUser.setId(userId);

        when(mapper.playlistFromInfoDTO(playlistInfoDTO, currentUser)).thenReturn(playlist);
        when(playlistRepository.save(playlist)).thenReturn(playlist);

        Playlist savedPlaylist = playlistService.savePlaylist(playlistInfoDTO, Optional.of(currentUser));

        assertNotNull(savedPlaylist);
    }

    @Test
    public void testDeletePlaylist() {
        User currentUser = new User();
        currentUser.setId(userId);

        when(playlistRepository.findById(playlistId)).thenReturn(Optional.of(playlist));
        when(playlist.getUser()).thenReturn(currentUser);

        playlistService.deletePlaylist(playlistId, Optional.of(currentUser));

        verify(playlistRepository, times(1)).deleteById(playlistId);
    }

    @Test
    public void testUpdatePlaylist() {
        PlaylistInfoDTO playlistInfoDTO = new PlaylistInfoDTO();
        playlistInfoDTO.setId(playlistId.toString());
        playlistInfoDTO.setName("Updated Playlist");
        playlistInfoDTO.setDescription("Updated description");

        User currentUser = new User();
        currentUser.setId(userId);

        when(playlistRepository.findById(playlistId)).thenReturn(Optional.of(playlist));
        when(playlist.getUser()).thenReturn(currentUser);
        when(playlistRepository.save(playlist)).thenReturn(playlist);

        Playlist updatedPlaylist = playlistService.updatePlaylist(playlistInfoDTO, Optional.of(currentUser));

        assertNotNull(updatedPlaylist);
    }

    @Test
    public void testAddSongToPlaylist() {
        User currentUser = new User();
        currentUser.setId(userId);

        when(playlistRepository.findById(playlistId)).thenReturn(Optional.of(playlist));
        when(songRepository.findById(songId)).thenReturn(Optional.of(song));
        when(playlist.getUser()).thenReturn(currentUser);

        playlistService.addSongToPlaylist(songId, playlistId, Optional.of(currentUser));

        verify(playlistRepository, times(1)).save(playlist);
    }

    @Test
    public void testRemoveSongFromPlaylist() {
        User currentUser = new User();
        currentUser.setId(userId);

        when(playlistRepository.findById(playlistId)).thenReturn(Optional.of(playlist));
        when(songRepository.findById(songId)).thenReturn(Optional.of(song));
        when(playlist.getUser()).thenReturn(currentUser);

        playlistService.removeSongFromPlaylist(songId, playlistId, Optional.of(currentUser));

        verify(playlistRepository, times(1)).save(playlist);
        assertFalse(playlist.getSongs().contains(song));
    }
}
