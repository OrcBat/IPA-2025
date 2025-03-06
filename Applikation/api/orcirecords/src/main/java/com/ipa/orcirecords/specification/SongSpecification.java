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
import java.util.Arrays;
import java.util.Date;
import java.util.List;
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

    public int calculateMatchPercentage(Song song, Map<String, String> filters) {
        int matchCount = 0;
        int totalFilters = 0;

        for (Map.Entry<String, String> entry : filters.entrySet()) {
            totalFilters++;

            String filterValue = entry.getValue().toLowerCase();

            switch (entry.getKey()) {
                case "title":
                    if (song.getTitle().toLowerCase().contains(filterValue)) matchCount++;
                    break;
                case "releaseDate":
                    if (song.getReleaseDate().toString().equalsIgnoreCase(filterValue)) matchCount++;
                    break;
                case "artist":
                    if (song.getArtist().getName().toLowerCase().contains(filterValue)) matchCount++;
                    break;
                case "energy":
                    if (song.getEnergy().toString().equalsIgnoreCase(filterValue)) matchCount++;
                    break;
                case "mood":
                    if (song.getMood().toString().toLowerCase().contains(filterValue)) matchCount++;
                    break;
                case "plays":
                    int playsValue = Integer.parseInt(filterValue);
                    int range = (int) (playsValue * 0.5);

                    if (song.getPlays() >= (playsValue - range) && song.getPlays() <= (playsValue + range)) {
                        matchCount++;
                    }
                    break;
                case "genre":
                    List<String> songGenres = song.getGenres().stream()
                            .map(g -> g.getName().toLowerCase())
                            .toList();
                    List<String> filterGenres = Arrays.stream(filterValue.split(","))
                            .map(String::trim)
                            .toList();

                    if (songGenres.stream().anyMatch(filterGenres::contains)) {
                        matchCount++;
                    }
                    break;

            }
        }

        return totalFilters > 0 ? (matchCount * 100) / totalFilters : 0;
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
