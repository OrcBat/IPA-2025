package com.ipa.orcirecords.repository;

import com.ipa.orcirecords.model.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface SongRepository extends JpaRepository<Song, UUID>, JpaSpecificationExecutor<Song> {
    Optional<Song> findSongByTitle(String title);
}