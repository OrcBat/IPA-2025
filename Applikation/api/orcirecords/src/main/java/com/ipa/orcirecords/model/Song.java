package com.ipa.orcirecords.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "song", schema = "public")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Song {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false)
    private String title;

    @Temporal(TemporalType.DATE)
    @Column(nullable = false)
    private Date releaseDate;

    @Column(nullable = false, length = 30)
    private String energy;

    @Column(nullable = false, length = 30)
    private String mood;

    @Column(nullable = false)
    private int plays;

    @ManyToOne
    @JoinColumn(name = "artist_id", nullable = false)
    private Artist artist;

    @ManyToMany
    @JoinTable(
            name = "song_genre",
            joinColumns = @JoinColumn(name = "song_id"),
            inverseJoinColumns = @JoinColumn(name = "genre_id")
    )
    private List<Genre> genres;
}
