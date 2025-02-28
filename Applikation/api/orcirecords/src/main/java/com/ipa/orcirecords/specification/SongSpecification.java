package com.ipa.orcirecords.specification;

import com.ipa.orcirecords.model.Artist;
import com.ipa.orcirecords.model.Genre;
import com.ipa.orcirecords.model.Song;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Join;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Date;
import java.util.Map;

@Slf4j
@Component
public class SongSpecification {
    public Specification<Song> getSongSpecification(Map<String, String> filters) {
        Specification<Song> specification = Specification.where(null);
        if (filters != null) {
            for (Map.Entry<String, String> entry : filters.entrySet()) {
                switch (entry.getKey()) {
                    case "title" -> specification = specification.and(containsTitle(entry.getValue()));
                    case "releaseDate" -> specification = specification.and(containsReleaseDate(entry.getValue()));
                    case "energy" -> specification = specification.and(containsEnergy(entry.getValue()));
                    case "mood" -> specification = specification.and(containsMood(entry.getValue()));
                    case "plays" -> specification = specification.and(containsPlays(entry.getValue()));
                    case "artist" -> specification = specification.and(containsArtist(entry.getValue()));
                    case "genre" -> specification = specification.and(containsGenre(entry.getValue()));
                    default -> log.warn("Unable to filter on column {}", entry.getKey());
                }
            }
        }
        return specification;
    }

    private Specification<Song> containsTitle(String title) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), "%" + title.toLowerCase() + "%");
    }

    private Specification<Song> containsReleaseDate(String releaseDate) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(root.get("releaseDate"), "%" + Date.from(Instant.parse(releaseDate)) + "%");
    }

    private Specification<Song> containsEnergy(String energy) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(criteriaBuilder.lower(root.get("energy")), "%" + energy.toLowerCase() + "%");
    }

    private Specification<Song> containsMood(String mood) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(criteriaBuilder.lower(root.get("mood")), "%" + mood.toLowerCase() + "%");
    }

    private Specification<Song> containsPlays(String plays) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(root.get("plays"), "%" + Integer.parseInt(plays) + "%");
    }

    private Specification<Song> containsArtist(String artistName) {
        return (root, query, criteriaBuilder) -> {
            Join<Song, Artist> join = root.join("artist");

            Expression<String> nameExpression = join.get("name");

            return criteriaBuilder.like(criteriaBuilder.lower(nameExpression), "%" + artistName.toLowerCase() + "%");
        };
    }

    private Specification<Song> containsGenre(String genreName) {
        return (root, query, criteriaBuilder) -> {
            Join<Song, Genre> join = root.join("genres");

            Expression<String> nameExpression = join.get("name");

            return criteriaBuilder.like(criteriaBuilder.lower(nameExpression), "%" + genreName.toLowerCase() + "%");
        };
    }
}
