package com.ipa.orcirecords.specification;

import com.ipa.orcirecords.model.Artist;
import com.ipa.orcirecords.model.Genre;
import com.ipa.orcirecords.model.song.Energy;
import com.ipa.orcirecords.model.song.Mood;
import com.ipa.orcirecords.model.song.Song;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Join;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.Map;

@Slf4j
@Component
public class SongSpecification {
    public Specification<Song> getSongSpecification(Map<String, String> filters) {
        Specification<Song> specification = Specification.where(null);
        if (filters != null) {
            for (Map.Entry<String, String> entry : filters.entrySet()) {
                Specification<Song> newSpec = switch (entry.getKey()) {
                    case "title" -> containsTitle(entry.getValue());
                    case "releaseDate" -> containsReleaseDate(entry.getValue());
                    case "energy" -> containsEnergy(entry.getValue());
                    case "mood" -> containsMood(entry.getValue());
                    case "plays" -> containsPlays(entry.getValue());
                    case "artist" -> containsArtist(entry.getValue());
                    case "genre" -> containsGenre(entry.getValue());
                    default -> null;
                };

                if (newSpec != null) {
                    specification = specification.or(newSpec);
                }
            }
        }
        return specification;
    }

    private Specification<Song> containsTitle(String title) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(criteriaBuilder.lower(root.get("title")), "%" + title.toLowerCase() + "%");
    }

    private Specification<Song> containsReleaseDate(String releaseDate) {
        return (root, query, criteriaBuilder) -> {
            LocalDate localDate = LocalDate.parse(releaseDate);
            Date date = Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
            return criteriaBuilder.equal(root.get("releaseDate"), date);
        };
    }

    private Specification<Song> containsEnergy(String energy) {
        return (root, query, criteriaBuilder) -> {
            try {
                Energy energyEnum = Energy.valueOf(energy.toUpperCase());
                return criteriaBuilder.equal(root.get("energy"), energyEnum);
            } catch (IllegalArgumentException e) {
                return criteriaBuilder.conjunction();
            }
        };
    }


    private Specification<Song> containsMood(String mood) {
        return (root, query, criteriaBuilder) -> {
            try {
                Mood moodEnum = Mood.valueOf(mood.toUpperCase());
                return criteriaBuilder.equal(root.get("mood"), moodEnum);
            } catch (IllegalArgumentException e) {
                return criteriaBuilder.conjunction();
            }
        };
    }

    private Specification<Song> containsPlays(String plays) {
        return (root, query, criteriaBuilder) -> {
            try {
                int playsValue = Integer.parseInt(plays);
                int range = (int) (playsValue * 0.5);

                return criteriaBuilder.between(root.get("plays"), playsValue - range, playsValue + range);
            } catch (NumberFormatException e) {
                return criteriaBuilder.conjunction();
            }
        };
    }

    private Specification<Song> containsArtist(String artistName) {
        return (root, query, criteriaBuilder) -> {
            Join<Song, Artist> join = root.join("artist");

            Expression<String> nameExpression = join.get("name");

            return criteriaBuilder.like(criteriaBuilder.lower(nameExpression), "%" + artistName.toLowerCase() + "%");
        };
    }

    private Specification<Song> containsGenre(String genreNames) {
        return (root, query, criteriaBuilder) -> {
            String[] genreArray = genreNames.split(",");

            Join<Song, Genre> genreJoin = root.join("genres");
            criteriaBuilder.lower(genreJoin.get("name"));

            return genreJoin.get("name").in((Object[]) genreArray);
        };
    }

}
