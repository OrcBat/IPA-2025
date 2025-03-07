CREATE EXTENSION IF NOT EXISTS pgcrypto;
DROP TABLE IF EXISTS playlist_song, song_genre, playlist, song, artist, genre, app_user CASCADE;

CREATE TABLE app_user
(
    id       UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255)        NOT NULL,
    role     VARCHAR(255)        NOT NULL
);

CREATE TABLE genre
(
    id   UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE artist
(
    id       UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name     VARCHAR(255) UNIQUE NOT NULL,
    genre_id UUID,
    CONSTRAINT fk_genre FOREIGN KEY (genre_id) REFERENCES genre (id) ON DELETE SET NULL
);

CREATE TABLE song
(
    id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title        VARCHAR(255) NOT NULL,
    release_date DATE         NOT NULL,
    energy       VARCHAR(30)  NOT NULL,
    mood         VARCHAR(30)  NOT NULL,
    plays        BIGINT       NOT NULL,
    artist_id    UUID         NOT NULL,
    CONSTRAINT fk_artist FOREIGN KEY (artist_id) REFERENCES artist (id) ON DELETE NO ACTION
);

CREATE TABLE playlist
(
    id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    user_id     UUID         NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES app_user (id) ON DELETE NO ACTION
);

CREATE TABLE playlist_song
(
    playlist_id UUID NOT NULL,
    song_id     UUID NOT NULL,
    PRIMARY KEY (playlist_id, song_id),
    CONSTRAINT fk_playlist FOREIGN KEY (playlist_id) REFERENCES playlist (id) ON DELETE CASCADE,
    CONSTRAINT fk_song FOREIGN KEY (song_id) REFERENCES song (id) ON DELETE CASCADE
);

CREATE TABLE song_genre
(
    song_id  UUID NOT NULL,
    genre_id UUID NOT NULL,
    PRIMARY KEY (song_id, genre_id),
    CONSTRAINT fk_song FOREIGN KEY (song_id) REFERENCES song (id) ON DELETE CASCADE,
    CONSTRAINT fk_genre FOREIGN KEY (genre_id) REFERENCES genre (id) ON DELETE CASCADE
);


CREATE INDEX idx_user_username ON app_user (username);
CREATE INDEX idx_song_title ON song (title);
CREATE INDEX idx_genre_name ON genre (name);
CREATE INDEX idx_artist_name ON artist (name);
CREATE INDEX idx_playlist_user ON playlist (user_id);

