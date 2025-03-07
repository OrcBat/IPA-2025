package com.ipa.orcirecords;

import com.ipa.orcirecords.dto.ArtistDTO;
import com.ipa.orcirecords.dto.GenreDTO;
import com.ipa.orcirecords.dto.SongDTO;
import com.ipa.orcirecords.dto.mapper.Mapper;
import com.ipa.orcirecords.model.Artist;
import com.ipa.orcirecords.model.Genre;
import com.ipa.orcirecords.model.song.Energy;
import com.ipa.orcirecords.model.song.Mood;
import com.ipa.orcirecords.model.song.Song;
import com.ipa.orcirecords.repository.ArtistRepository;
import com.ipa.orcirecords.repository.GenreRepository;
import com.ipa.orcirecords.repository.SongRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.Assert.*;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class MapperTest {

    @InjectMocks
    private Mapper mapper;

    @Mock
    private GenreRepository genreRepository;

    @Mock
    private SongRepository songRepository;

    @Mock
    private ArtistRepository artistRepository;

    @Mock
    private Genre genre;

    @Mock
    private Artist artist;

    @Mock
    private Song song;

    private final UUID songId = UUID.randomUUID();
    private final UUID genreId = UUID.randomUUID();
    private final UUID artistId = UUID.randomUUID();

    private Date releaseDate;

    @Before
    public void setUp() throws Exception {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        releaseDate = sdf.parse("2025-01-01");
    }

    @Test
    public void testSongListToDTO() {
        Song song1 = new Song();
        song1.setId(songId);
        song1.setTitle("Song 1");
        song1.setPlays(100);
        song1.setMood(Mood.HAPPY);
        song1.setEnergy(Energy.HIGH);
        song1.setReleaseDate(releaseDate);
        song1.setArtist(artist);

        Genre genre1 = new Genre();
        genre1.setName("Rock");

        song1.setGenres(List.of(genre1));

        List<Song> songs = List.of(song1);

        List<SongDTO> songDTOs = mapper.songListToDTO(songs);

        assertNotNull(songDTOs);
        assertEquals(1, songDTOs.size());
        assertEquals("Song 1", songDTOs.get(0).getTitle());
        assertTrue(songDTOs.get(0).getGenres().contains("Rock"));
    }

    @Test
    public void testSongToDTO() {
        Song song1 = new Song();
        song1.setId(songId);
        song1.setTitle("Song 1");
        song1.setPlays(100);
        song1.setMood(Mood.HAPPY);
        song1.setEnergy(Energy.HIGH);
        song1.setReleaseDate(releaseDate);
        song1.setArtist(artist);

        Genre genre1 = new Genre();
        genre1.setName("Rock");

        song1.setGenres(List.of(genre1));

        SongDTO songDTO = mapper.songToDTO(song1);

        assertNotNull(songDTO);
        assertEquals("Song 1", songDTO.getTitle());
        assertTrue(songDTO.getGenres().contains("Rock"));
    }

    @Test
    public void testSongFromDTO() {
        SongDTO songDTO = new SongDTO();
        songDTO.setTitle("Song 1");
        songDTO.setPlays(100);
        songDTO.setMood(Mood.HAPPY);
        songDTO.setEnergy(Energy.HIGH);
        songDTO.setReleaseDate(releaseDate);
        songDTO.setArtist("Artist Name");
        songDTO.setGenres(List.of("Rock"));

        when(artistRepository.findArtistByName("Artist Name")).thenReturn(Optional.of(artist));
        when(genreRepository.findByName("Rock")).thenReturn(Optional.of(genre));

        Song song = mapper.songFromDTO(songDTO);

        assertNotNull(song);
        assertEquals("Song 1", song.getTitle());
        assertEquals(1, song.getGenres().size());
        assertEquals(artist, song.getArtist());
    }

    @Test
    public void testArtistListToDTO() {
        Artist artist1 = new Artist();
        artist1.setId(artistId);
        artist1.setName("Artist 1");

        Song song1 = new Song();
        song1.setTitle("Song 1");

        artist1.setSongs(List.of(song1));

        List<ArtistDTO> artistDTOs = mapper.artistListToDTO(List.of(artist1));

        assertNotNull(artistDTOs);
        assertEquals(1, artistDTOs.size());
        assertEquals("Artist 1", artistDTOs.get(0).getName());
        assertTrue(artistDTOs.get(0).getSongs().contains("Song 1"));
    }

    @Test
    public void testArtistToDTO() {
        Artist artist1 = new Artist();
        Genre genre = new Genre();
        genre.setName("Rock");

        artist1.setId(artistId);
        artist1.setName("Artist 1");
        artist1.setGenre(genre);

        Song song1 = new Song();
        song1.setTitle("Song 1");

        artist1.setSongs(List.of(song1));

        ArtistDTO artistDTO = mapper.artistToDTO(artist1);

        assertNotNull(artistDTO);
        assertEquals("Artist 1", artistDTO.getName());
        assertTrue(artistDTO.getSongs().contains("Song 1"));
    }

    @Test
    public void testArtistFromDTO() {
        ArtistDTO artistDTO = new ArtistDTO();
        artistDTO.setName("Artist 1");
        artistDTO.setSongs(List.of("Song 1"));
        artistDTO.setGenre("Rock");

        when(genreRepository.findByName("Rock")).thenReturn(Optional.of(genre));
        when(songRepository.findSongByTitle("Song 1")).thenReturn(Optional.of(song));

        Artist artist = mapper.artistFromDTO(artistDTO);

        assertNotNull(artist);
        assertEquals("Artist 1", artist.getName());
        assertNotNull(artist.getGenre());
        assertTrue(artist.getSongs().size() > 0);
    }

    @Test
    public void testGenreListToDTO() {
        Genre genre1 = new Genre();
        genre1.setId(genreId);
        genre1.setName("Rock");

        Artist artist1 = new Artist();
        artist1.setName("Artist 1");

        genre1.setArtists(List.of(artist1));

        List<GenreDTO> genreDTOs = mapper.genreListToDTO(List.of(genre1));

        assertNotNull(genreDTOs);
        assertEquals(1, genreDTOs.size());
        assertEquals("Rock", genreDTOs.get(0).getName());
        assertTrue(genreDTOs.get(0).getArtists().contains("Artist 1"));
    }

    @Test
    public void testGenreToDTO() {
        Genre genre1 = new Genre();
        genre1.setId(genreId);
        genre1.setName("Rock");

        Artist artist1 = new Artist();
        artist1.setName("Artist 1");

        genre1.setArtists(List.of(artist1));

        GenreDTO genreDTO = mapper.genreToDTO(genre1);

        assertNotNull(genreDTO);
        assertEquals("Rock", genreDTO.getName());
        assertTrue(genreDTO.getArtists().contains("Artist 1"));
    }

    @Test
    public void testGenreFromDTO() {
        GenreDTO genreDTO = new GenreDTO();
        genreDTO.setName("Rock");
        genreDTO.setArtists(List.of("Artist 1"));

        when(artistRepository.findArtistByName("Artist 1")).thenReturn(Optional.of(artist));

        Genre genre = mapper.genreFromDTO(genreDTO);

        assertNotNull(genre);
        assertEquals("Rock", genre.getName());
        assertTrue(genre.getArtists().size() > 0);
    }
}
