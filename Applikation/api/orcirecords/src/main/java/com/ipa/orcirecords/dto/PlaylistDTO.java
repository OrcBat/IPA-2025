package com.ipa.orcirecords.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PlaylistDTO {
    String id;
    String name;
    String description;
    List<SongDTO> songs;
    String ownerId;
}
