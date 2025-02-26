CREATE TABLE IF NOT EXISTS app_user (
                                        id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                                        username VARCHAR(255) UNIQUE NOT NULL,
                                        password VARCHAR(255)        NOT NULL
);

CREATE TABLE IF NOT EXISTS role (
                                    id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                                    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS user_roles (
                                          user_id BIGINT NOT NULL,
                                          role_id BIGINT NOT NULL,
                                          PRIMARY KEY (user_id, role_id),
                                          CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES app_user (id) ON DELETE CASCADE,
                                          CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role (id) ON DELETE CASCADE
);
