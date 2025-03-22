-- Creating the 'users' table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);

-- Inserting sample data into 'users'
INSERT INTO users (username, email)
VALUES ('Phoenix', 'phoenix@example.com'),
       ('Alex', 'alex@example.com'),
       ('Jordan', 'jordan@example.com');

-- Creating the 'saved_countries' table
CREATE TABLE saved_countries (
    save_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    country_name VARCHAR(100) NOT NULL
);

-- Inserting sample data into 'saved_countries'
INSERT INTO saved_countries (user_id, country_name)
VALUES (1, 'France'),
       (2, 'Japan'),
       (3, 'Canada');

-- Creating the 'country_counts' table
CREATE TABLE country_counts (
    country_name VARCHAR(100) PRIMARY KEY,
    save_count INT DEFAULT 0
);

-- Inserting sample data into 'country_counts'
INSERT INTO country_counts (country_name, save_count)
VALUES ('France', 1),
       ('Japan', 1),
       ('Canada', 1);

-- Sample query to get all users
SELECT * FROM users;

-- Sample query to get saved countries for a specific user
SELECT country_name FROM saved_countries WHERE user_id = 1;

-- Sample query to get the most saved countries
SELECT * FROM country_counts ORDER BY save_count DESC;
