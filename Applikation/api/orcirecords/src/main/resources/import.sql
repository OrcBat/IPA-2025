INSERT INTO app_user (id, username, password, "role")
VALUES ('f9b58e19-df8e-4f49-9eb1-07442f8d9731', 'user', '$2a$10$/H7E.dO7S0mA/TFnbb1.le6YRgv1F3M18C5USeCdJ7Gua4UQmuieu',
        'USER'),
       ('a3c2c416-4b0f-44b9-87ad-1ef36e540ec6', 'admin', '$2a$10$/H7E.dO7S0mA/TFnbb1.le6YRgv1F3M18C5USeCdJ7Gua4UQmuieu',
        'ADMIN');

INSERT INTO genre (id, name)
VALUES ('1b8a0cb6-4323-4829-98e2-2b0ebf10ec64', 'Rock'),
       ('2f8a45ea-77f7-4e7e-9317-7d4b8d4a1d0b', 'Pop'),
       ('39e7614f-1b85-4f91-a85a-62b8b1a10947', 'Hip Hop'),
       ('4a5d73dc-2f3b-4185-97b9-9d2c01fd3c51', 'R&B'),
       ('8bde4693-9631-4b92-bf97-58746244216b', 'Jazz'),
       ('3aab7c79-77ea-4a90-8bb9-2f4b76e823be', 'Electronic'),
       ('db7a21fe-7a1b-4dbf-8320-2a7a81527fe2', 'Classical'),
       ('a2295e9d-4c88-487f-9d0e-1b94be415c7b', 'Reggae'),
       ('9a65f2c0-cb7f-42b1-b755-dc8c1fc5a818', 'Blues'),
       ('0e7f846e-6888-41c7-b321-e5eac7a5de2a', 'Country'),
       ('77b759a3-c2c1-4fa6-a755-c8ad00b2a4e3', 'Metal');

INSERT INTO artist (id, name, genre_id)
VALUES ('6c24f72d-8c1f-4cb9-930f-b5fddf6b8fc5', 'Radiohead', '1b8a0cb6-4323-4829-98e2-2b0ebf10ec64'),
       ('7c14208c-304c-4c4e-bc96-0d0dd489b8da', 'Michael Jackson', '2f8a45ea-77f7-4e7e-9317-7d4b8d4a1d0b'),
       ('8d6a5f5b-10c4-4d98-9c67-0422fddfa85a', 'Kendrick Lamar', '39e7614f-1b85-4f91-a85a-62b8b1a10947'),
       ('9e5c2adf-22c9-4f88-bb02-8c2a2f7f9a98', 'Sade', '4a5d73dc-2f3b-4185-97b9-9d2c01fd3c51'),
       ('ac645b47-9c13-4537-bb74-e4c56c29f658', 'Miles Davis', '8bde4693-9631-4b92-bf97-58746244216b'),
       ('fd6c75e8-91e9-4ec1-b03e-7d8c937f60b4', 'Daft Punk', '3aab7c79-77ea-4a90-8bb9-2f4b76e823be'),
       ('d94e1f8c-54a4-4978-b88a-b6a532ab7f23', 'Beethoven', 'db7a21fe-7a1b-4dbf-8320-2a7a81527fe2'),
       ('e0f792b0-bb88-4d67-b417-ff689b7a75ad', 'Bob Marley', 'a2295e9d-4c88-487f-9d0e-1b94be415c7b'),
       ('b1d57224-3d0d-44ba-a4db-4aaf7d5b01f7', 'Johnny Cash', '0e7f846e-6888-41c7-b321-e5eac7a5de2a'),
       ('d0b6d5f7-4ef1-49e1-b4a1-8a6a057ff493', 'Metallica', '77b759a3-c2c1-4fa6-a755-c8ad00b2a4e3'),
       ('f5f2a833-dc29-44bc-973a-ff6a832b4e9e', 'B.B. King', '9a65f2c0-cb7f-42b1-b755-dc8c1fc5a818');

INSERT INTO song (id, title, release_date, energy, mood, plays, artist_id)
VALUES
    --Rock
    ('10a7e7c1-5b74-4026-a71d-f0a12a2a788d', '15 Step', '2007-10-10', 'HIGH', 'EXCITING', 98501395,
     '6c24f72d-8c1f-4cb9-930f-b5fddf6b8fc5'),
    ('20b7e1c1-6b74-4026-a71d-f0a12a2b1a1b', 'Creep', '1992-09-21', 'LOW', 'SAD', 15050000,
     '6c24f72d-8c1f-4cb9-930f-b5fddf6b8fc5'),
    ('20b7e1c1-6b74-4026-a71d-f0a12a2b2b2b', 'Nice Dream', '1991-09-10', 'HIGH', 'EXCITING', 25000000,
     '6c24f72d-8c1f-4cb9-930f-b5fddf6b8fc5'),

    --Pop
    ('11d9df27-33fb-4c0c-a5b8-097676cd7487', 'Beat it', '1982-11-30', 'HIGH', 'EXCITING', 13313751,
     '7c14208c-304c-4c4e-bc96-0d0dd489b8da'),
    ('21c9f4d1-8b0c-4b45-8f1a-8a3b45656743', 'Thriller', '1982-11-30', 'HIGH', 'EXCITING', 11000000,
     '7c14208c-304c-4c4e-bc96-0d0dd489b8da'),
    ('21d5f3f2-9f9f-46b2-91f9-8c2fabc9d5c6', 'Billie Jean', '1982-01-02', 'HIGH', 'EXCITING', 12000000,
     '7c14208c-304c-4c4e-bc96-0d0dd489b8da'),

    --Hip Hop
    ('12b64b4f-7fd1-4a6b-8a45-6c0b2e0d3f13', 'Alright', '2015-03-15', 'MEDIUM', 'HAPPY', 8505509,
     '8d6a5f5b-10c4-4d98-9c67-0422fddfa85a'),
    ('22c8f34f-b57c-45f9-b1f3-4532a89e8f35', 'HUMBLE.', '2017-03-30', 'MEDIUM', 'ANGRY', 21000000,
     '8d6a5f5b-10c4-4d98-9c67-0422fddfa85a'),
    ('23f7c7c3-d4f0-45d3-9388-2be612cabbbe', 'DNA.', '2017-03-30', 'HIGH', 'EXCITING', 23000000,
     '8d6a5f5b-10c4-4d98-9c67-0422fddfa85a'),


    --R&B
    ('13e84c4d-8c1d-4976-9f14-7c38e5a6aef8', 'Kiss of Life', '1992-10-26', 'LOW', 'ROMANTIC', 1999166,
     '9e5c2adf-22c9-4f88-bb02-8c2a2f7f9a98'),
    ('24d8a1b3-70c2-47f3-b8f6-462f7b6c9ccf', 'Smooth Operator', '1984-02-15', 'LOW', 'ROMANTIC', 3700000,
     '9e5c2adf-22c9-4f88-bb02-8c2a2f7f9a98'),
    ('25f7a1c6-b64f-496d-a1d7-8479df0e5fd6', 'By Your Side', '2000-08-21', 'LOW', 'ROMANTIC', 2500000,
     '9e5c2adf-22c9-4f88-bb02-8c2a2f7f9a98'),

    --Jazz
    ('14f9f2f1-b622-4ad3-a726-699b74a1d78f', 'So What', '1959-08-17', 'LOW', 'RELAXED', 1302315,
     'ac645b47-9c13-4537-bb74-e4c56c29f658'),
    ('26c4a1d1-d4b7-48e2-b6df-7b6d8e2f93d2', 'Take Five', '1959-06-01', 'LOW', 'RELAXED', 4100000,
     'ac645b47-9c13-4537-bb74-e4c56c29f658'),
    ('27f7c3c3-aeb7-4e9d-b8df-9df5723e9a63', 'Autumn Leaves', '1959-06-01', 'LOW', 'RELAXED', 3000000,
     'ac645b47-9c13-4537-bb74-e4c56c29f658'),

    --Electronic
    ('15f1b54e-bc2a-4879-9f23-b5812431fa19', 'One More Time', '2000-11-02', 'HIGH', 'HAPPY', 11549262,
     'fd6c75e8-91e9-4ec1-b03e-7d8c937f60b4'),
    ('28d9b3d9-ae93-4c95-8f91-f3886b591e96', 'Instant Crush', '2013-12-16', 'MEDIUM', 'ROMANTIC', 14000000,
     'fd6c75e8-91e9-4ec1-b03e-7d8c937f60b4'),
    ('29f5b1d4-3e24-48c4-92c1-fffa49158f49', 'Around the World', '1997-11-01', 'HIGH', 'EXCITING', 17000000,
     'fd6c75e8-91e9-4ec1-b03e-7d8c937f60b4'),

    -- Classical
    ('16c0a0f2-7221-4578-bca3-8e420e9b17a4', 'Für Elise', '1810-04-27', 'LOW', 'SAD', 10239543,
     'd94e1f8c-54a4-4978-b88a-b6a532ab7f23'),
    ('59f9b2b3-e9d5-4cd5-98b9-b74d524e1e0f', 'Symphony No. 5', '1808-12-22', 'LOW', 'SAD', 13000000,
     'd94e1f8c-54a4-4978-b88a-b6a532ab7f23'),
    ('fc6a0144-b37b-4c36-9ca3-f24949f8b1c2', 'Moonlight Sonata', '1801-01-01', 'LOW', 'SAD', 14500000,
     'd94e1f8c-54a4-4978-b88a-b6a532ab7f23'),

    -- Reggae
    ('17c3b629-91f2-4874-8c0e-ff5e9069bb1d', 'No Woman No Cry', '1974-10-25', 'MEDIUM', 'RELAXED', 35012343,
     'e0f792b0-bb88-4d67-b417-ff689b7a75ad'),
    ('99e4a0f1-893a-4ab5-8e79-faf510f34d65', 'Redemption Song', '1979-10-03', 'LOW', 'NOSTALGIC', 21500000,
     'e0f792b0-bb88-4d67-b417-ff689b7a75ad'),
    ('c8c2170d-7de1-4f56-87d1-7b259b28fdbb', 'Buffalo Soldier', '1983-10-10', 'MEDIUM', 'EXCITING', 15000000,
     'e0f792b0-bb88-4d67-b417-ff689b7a75ad'),

    -- Blues
    ('18c2a84a-b825-4738-8135-d9e4e003990b', 'The Thrill Is Gone', '1969-11-12', 'LOW', 'SAD', 12371244,
     'f5f2a833-dc29-44bc-973a-ff6a832b4e9e'),
    ('d5b865a0-30f3-4f64-bd96-0a1f8fa9d059', 'Every Day I Have the Blues', '1955-06-01', 'MEDIUM', 'SAD', 24500000,
     'f5f2a833-dc29-44bc-973a-ff6a832b4e9e'),
    ('2f4b3dbe-f4ac-4704-a360-2994d92e232d', 'Paying the Cost to Be the Boss', '1968-03-01', 'HIGH', 'EXCITING',
     2100000000, 'f5f2a833-dc29-44bc-973a-ff6a832b4e9e'),

-- Metal
    ('3f16dbb5-8b39-47bb-9792-66016c6ea837', 'Enter Sandman', '1991-07-29', 'HIGH', 'EXCITING', 63704562,
     'd0b6d5f7-4ef1-49e1-b4a1-8a6a057ff493'),
    ('6d57ff67-80db-402e-bfba-b2b8977b9292', 'Master of Puppets', '1986-03-03', 'HIGH', 'EXCITING', 59000000,
     'd0b6d5f7-4ef1-49e1-b4a1-8a6a057ff493'),
    ('8b4a7c44-cb77-4f33-bf2e-04d93e4c3a84', 'One', '1988-03-23', 'HIGH', 'ANGRY', 47000000,
     'd0b6d5f7-4ef1-49e1-b4a1-8a6a057ff493'),

-- Country
    ('1aa8c3ff-47bc-456d-bca6-b9e8a3e56f21', 'Ring of Fire', '1963-04-01', 'HIGH', 'NOSTALGIC', 23557633,
     'b1d57224-3d0d-44ba-a4db-4aaf7d5b01f7'),
    ('6b89e4f3-8533-4333-b706-96f0400bb2e3', 'I Walk the Line', '1956-05-01', 'MEDIUM', 'SAD', 30000000,
     'b1d57224-3d0d-44ba-a4db-4aaf7d5b01f7'),
    ('2a74b5a5-5a94-44e5-9b66-cd1d57e0cb2f', 'Folsom Prison Blues', '1955-12-15', 'HIGH', 'EXCITING', 26000000,
     'b1d57224-3d0d-44ba-a4db-4aaf7d5b01f7');



INSERT INTO playlist (id, name, description, user_id)
VALUES ('7857dd4e-1a21-4f0f-ac87-d2c6f3f2900f', 'Chill', 'Songs to relax to',
        (SELECT id FROM app_user WHERE username = 'user')),
       ('fc8ffeb9-af20-4b28-ab98-38998a5501a1', 'Workout', 'Songs for working out',
        (SELECT id FROM app_user WHERE username = 'admin')),
       ('f62c1e6b-0c5a-4dbf-b978-82d27b3cc470', 'Jazz Vibes', 'Chill jazz beats',
        (SELECT id FROM app_user WHERE username = 'user')),
       ('f92c124e-3831-4379-bf13-bf093763f418', 'Party Playlist', 'Songs for a night out',
        (SELECT id FROM app_user WHERE username = 'admin')),
       ('7c8f0c99-4647-4b57-9521-df7c2d64d9d1', 'Classical Essentials', 'Timeless classical masterpieces',
        (SELECT id FROM app_user WHERE username = 'user')),
       ('3c4bb469-c43e-4784-bbdb-f81f2e9d94d7', 'Reggae Vibes', 'Feel-good reggae tunes',
        (SELECT id FROM app_user WHERE username = 'admin')),
       ('2d1c70b5-0c29-4c34-8c5d-22c440d84852', 'Blues Legends', 'Classic blues tracks',
        (SELECT id FROM app_user WHERE username = 'user')),
       ('7f983f1d-dfbd-4d95-824e-69971bdf3b8b', 'Country Roads', 'Country classics for every mood',
        (SELECT id FROM app_user WHERE username = 'admin')),
       ('2a531e58-bc9d-4675-bb5d-9bc13a95e465', 'EDM Party', 'Electronic dance music for an upbeat night',
        (SELECT id FROM app_user WHERE username = 'user')),
       ('0c9e7179-1682-47b0-987f-982bbf87edfc', 'Metal Anthems', 'A collection of classic metal songs',
        (SELECT id FROM app_user WHERE username = 'admin'));

INSERT INTO playlist_song (playlist_id, song_id)
VALUES ('7857dd4e-1a21-4f0f-ac87-d2c6f3f2900f', '10a7e7c1-5b74-4026-a71d-f0a12a2a788d'),
       ('fc8ffeb9-af20-4b28-ab98-38998a5501a1', '11d9df27-33fb-4c0c-a5b8-097676cd7487'),
       ('f62c1e6b-0c5a-4dbf-b978-82d27b3cc470', '14f9f2f1-b622-4ad3-a726-699b74a1d78f'),
       ('f92c124e-3831-4379-bf13-bf093763f418', '15f1b54e-bc2a-4879-9f23-b5812431fa19'),
       ('7c8f0c99-4647-4b57-9521-df7c2d64d9d1', '16c0a0f2-7221-4578-bca3-8e420e9b17a4'),
       ('3c4bb469-c43e-4784-bbdb-f81f2e9d94d7', '17c3b629-91f2-4874-8c0e-ff5e9069bb1d'),
       ('2d1c70b5-0c29-4c34-8c5d-22c440d84852', '18c2a84a-b825-4738-8135-d9e4e003990b'),
       ('7f983f1d-dfbd-4d95-824e-69971bdf3b8b', '1aa8c3ff-47bc-456d-bca6-b9e8a3e56f21'),
       ('0c9e7179-1682-47b0-987f-982bbf87edfc', '3f16dbb5-8b39-47bb-9792-66016c6ea837');

INSERT INTO song_genre (song_id, genre_id)
VALUES ('10a7e7c1-5b74-4026-a71d-f0a12a2a788d', '1b8a0cb6-4323-4829-98e2-2b0ebf10ec64'),
       ('20b7e1c1-6b74-4026-a71d-f0a12a2b1a1b', '1b8a0cb6-4323-4829-98e2-2b0ebf10ec64'),
       ('20b7e1c1-6b74-4026-a71d-f0a12a2b2b2b', '1b8a0cb6-4323-4829-98e2-2b0ebf10ec64'),

       ('11d9df27-33fb-4c0c-a5b8-097676cd7487', '2f8a45ea-77f7-4e7e-9317-7d4b8d4a1d0b'),
       ('22c8f34f-b57c-45f9-b1f3-4532a89e8f35', '2f8a45ea-77f7-4e7e-9317-7d4b8d4a1d0b'),
       ('23f7c7c3-d4f0-45d3-9388-2be612cabbbe', '2f8a45ea-77f7-4e7e-9317-7d4b8d4a1d0b'),

       ('25f7a1c6-b64f-496d-a1d7-8479df0e5fd6', '39e7614f-1b85-4f91-a85a-62b8b1a10947'),
       ('24d8a1b3-70c2-47f3-b8f6-462f7b6c9ccf', '39e7614f-1b85-4f91-a85a-62b8b1a10947'),
       ('13e84c4d-8c1d-4976-9f14-7c38e5a6aef8', '39e7614f-1b85-4f91-a85a-62b8b1a10947'),

       ('27f7c3c3-aeb7-4e9d-b8df-9df5723e9a63', '8bde4693-9631-4b92-bf97-58746244216b'),
       ('26c4a1d1-d4b7-48e2-b6df-7b6d8e2f93d2', '8bde4693-9631-4b92-bf97-58746244216b'),
       ('14f9f2f1-b622-4ad3-a726-699b74a1d78f', '8bde4693-9631-4b92-bf97-58746244216b'),

       ('29f5b1d4-3e24-48c4-92c1-fffa49158f49', '3aab7c79-77ea-4a90-8bb9-2f4b76e823be'),
       ('28d9b3d9-ae93-4c95-8f91-f3886b591e96', '3aab7c79-77ea-4a90-8bb9-2f4b76e823be'),
       ('15f1b54e-bc2a-4879-9f23-b5812431fa19', '3aab7c79-77ea-4a90-8bb9-2f4b76e823be'),

       ('fc6a0144-b37b-4c36-9ca3-f24949f8b1c2', '4a5d73dc-2f3b-4185-97b9-9d2c01fd3c51'),
       ('59f9b2b3-e9d5-4cd5-98b9-b74d524e1e0f', '4a5d73dc-2f3b-4185-97b9-9d2c01fd3c51'),
       ('16c0a0f2-7221-4578-bca3-8e420e9b17a4', '4a5d73dc-2f3b-4185-97b9-9d2c01fd3c51'),

       ('16c0a0f2-7221-4578-bca3-8e420e9b17a4', 'db7a21fe-7a1b-4dbf-8320-2a7a81527fe2'),
       ('fc6a0144-b37b-4c36-9ca3-f24949f8b1c2', 'db7a21fe-7a1b-4dbf-8320-2a7a81527fe2'),
       ('59f9b2b3-e9d5-4cd5-98b9-b74d524e1e0f', 'db7a21fe-7a1b-4dbf-8320-2a7a81527fe2'),

       ('17c3b629-91f2-4874-8c0e-ff5e9069bb1d', 'a2295e9d-4c88-487f-9d0e-1b94be415c7b'),
       ('c8c2170d-7de1-4f56-87d1-7b259b28fdbb', 'a2295e9d-4c88-487f-9d0e-1b94be415c7b'),
       ('99e4a0f1-893a-4ab5-8e79-faf510f34d65', 'a2295e9d-4c88-487f-9d0e-1b94be415c7b'),

       ('2a74b5a5-5a94-44e5-9b66-cd1d57e0cb2f', '0e7f846e-6888-41c7-b321-e5eac7a5de2a'),
       ('6b89e4f3-8533-4333-b706-96f0400bb2e3', '0e7f846e-6888-41c7-b321-e5eac7a5de2a'),
       ('1aa8c3ff-47bc-456d-bca6-b9e8a3e56f21', '0e7f846e-6888-41c7-b321-e5eac7a5de2a'),

       ('8b4a7c44-cb77-4f33-bf2e-04d93e4c3a84', '77b759a3-c2c1-4fa6-a755-c8ad00b2a4e3'),
       ('6d57ff67-80db-402e-bfba-b2b8977b9292', '77b759a3-c2c1-4fa6-a755-c8ad00b2a4e3'),
       ('3f16dbb5-8b39-47bb-9792-66016c6ea837', '77b759a3-c2c1-4fa6-a755-c8ad00b2a4e3'),

       ('2f4b3dbe-f4ac-4704-a360-2994d92e232d', '9a65f2c0-cb7f-42b1-b755-dc8c1fc5a818'),
       ('d5b865a0-30f3-4f64-bd96-0a1f8fa9d059', '9a65f2c0-cb7f-42b1-b755-dc8c1fc5a818'),
       ('18c2a84a-b825-4738-8135-d9e4e003990b', '9a65f2c0-cb7f-42b1-b755-dc8c1fc5a818');