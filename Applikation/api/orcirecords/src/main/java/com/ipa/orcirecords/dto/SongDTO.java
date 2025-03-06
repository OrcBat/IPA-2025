package com.ipa.orcirecords.dto;

import com.ipa.orcirecords.model.song.Energy;
import com.ipa.orcirecords.model.song.Mood;
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
    String id;
    String title;
    Date releaseDate;
    Energy energy;
    Mood mood;
    int plays;
    String artist;
    List<String> genres;
    int matchPercentage;
}
