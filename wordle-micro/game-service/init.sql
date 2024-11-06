CREATE TABLE users (
                       id SERIAL PRIMARY KEY,
                       username VARCHAR(255) NOT NULL UNIQUE,
                       wins INT DEFAULT 0,
                       loses INT DEFAULT 0
);

CREATE TABLE games (
                       id SERIAL PRIMARY KEY,
                       word VARCHAR(255) NOT NULL,
                       user_id BIGINT NULL,
                       game_status VARCHAR(50) NOT NULL,
                       current_try INT NOT NULL,
                       FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);