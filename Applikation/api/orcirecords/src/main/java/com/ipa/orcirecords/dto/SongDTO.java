package com.ipa.orcirecords.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SongDTO {
    String title;
    Date releaseDate;
    String energy;
    String mood;
    int plays;
    String artist;
    List<String> genres;
}
