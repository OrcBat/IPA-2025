INSERT INTO app_user (id, username, password, role)
VALUES ('f9b58e19-df8e-4f49-9eb1-07442f8d9731', 'user', '$2a$10$/H7E.dO7S0mA/TFnbb1.le6YRgv1F3M18C5USeCdJ7Gua4UQmuieu', 'USER'),
       ('a3c2c416-4b0f-44b9-87ad-1ef36e540ec6', 'admin', '$2a$10$/H7E.dO7S0mA/TFnbb1.le6YRgv1F3M18C5USeCdJ7Gua4UQmuieu', 'ADMIN');

INSERT INTO genre (id, name)
VALUES ('1b8a0cb6-4323-4829-98e2-2b0ebf10ec64', 'Rock'),
       ('2f8a45ea-77f7-4e7e-9317-7d4b8d4a1d0b', 'Pop'),
       ('39e7614f-1b85-4f91-a85a-62b8b1a10947', 'Hip Hop'),
       ('4a5d73dc-2f3b-4185-97b9-9d2c01fd3c51', 'R&B');

INSERT INTO artist (id, name, genre_id)
VALUES ('6c24f72d-8c1f-4cb9-930f-b5fddf6b8fc5', 'Radiohead', '1b8a0cb6-4323-4829-98e2-2b0ebf10ec64'),
       ('7c14208c-304c-4c4e-bc96-0d0dd489b8da', 'Michael Jackson', '2f8a45ea-77f7-4e7e-9317-7d4b8d4a1d0b'),
       ('8d6a5f5b-10c4-4d98-9c67-0422fddfa85a', 'Kendrick Lamar', '39e7614f-1b85-4f91-a85a-62b8b1a10947'),
       ('9e5c2adf-22c9-4f88-bb02-8c2a2f7f9a98', 'Sade', '4a5d73dc-2f3b-4185-97b9-9d2c01fd3c51');

INSERT INTO song (id, title, release_date, energy, mood, plays, artist_id)
VALUES ('10a7e7c1-5b74-4026-a71d-f0a12a2a788d', '15 Step', '2007-10-10', 'High', 'Experimental', 98501395,
        '6c24f72d-8c1f-4cb9-930f-b5fddf6b8fc5'),
       ('11d9df27-33fb-4c0c-a5b8-097676cd7487', 'Beat it', '1982-11-30', 'High', 'Motivating', 1331375126,
        '7c14208c-304c-4c4e-bc96-0d0dd489b8da'),
       ('12b64b4f-7fd1-4a6b-8a45-6c0b2e0d3f13', 'Alright', '2015-03-15', 'Medium', 'Uplifting', 850550920,
        '8d6a5f5b-10c4-4d98-9c67-0422fddfa85a'),
       ('13e84c4d-8c1d-4976-9f14-7c38e5a6aef8', 'Kiss of Life', '1992-10-26', 'Low', 'Romantic', 199916655,
        '9e5c2adf-22c9-4f88-bb02-8c2a2f7f9a98');

INSERT INTO playlist (id, name, description, user_id)
VALUES ('7857dd4e-1a21-4f0f-ac87-d2c6f3f2900f', 'Chill', 'Songs to relax to', (SELECT id FROM app_user WHERE username='user')),
       ('fc8ffeb9-af20-4b28-ab98-38998a5501a1', 'Workout', 'Songs for working out', (SELECT id FROM app_user WHERE username='admin'));

INSERT INTO playlist_song (playlist_id, song_id)
VALUES ('7857dd4e-1a21-4f0f-ac87-d2c6f3f2900f', '10a7e7c1-5b74-4026-a71d-f0a12a2a788d'),
       ('fc8ffeb9-af20-4b28-ab98-38998a5501a1', '11d9df27-33fb-4c0c-a5b8-097676cd7487');

INSERT INTO song_genre (song_id, genre_id)
VALUES ('10a7e7c1-5b74-4026-a71d-f0a12a2a788d', '1b8a0cb6-4323-4829-98e2-2b0ebf10ec64'),
       ('11d9df27-33fb-4c0c-a5b8-097676cd7487', '2f8a45ea-77f7-4e7e-9317-7d4b8d4a1d0b'),
       ('12b64b4f-7fd1-4a6b-8a45-6c0b2e0d3f13', '39e7614f-1b85-4f91-a85a-62b8b1a10947'),
       ('13e84c4d-8c1d-4976-9f14-7c38e5a6aef8', '4a5d73dc-2f3b-4185-97b9-9d2c01fd3c51');