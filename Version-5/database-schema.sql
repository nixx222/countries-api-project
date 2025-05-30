-- Creating the 'users' table
CREATE TABLE user_profile (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    country VARCHAR(100) NOT NULL,
    bio TEXT DEFAULT 'No bio provided',
);

-- Inserting sample data into 'users'
INSERT INTO users (username, email)
VALUES ('Phoenix', 'phoenix@example.com'),
       ('Alex', 'alex@example.com'),
       ('Jordan', 'jordan@example.com');

-- Creating the 'saved_countries' table



-- Inserting sample data into 'saved_countries' //REFACTOR TO MATCH SAVED COUNTRIES TABLE
INSERT INTO saved_countries (user_id, country_name)
VALUES (1, 'France'),
       (2, 'Japan'),
       (3, 'Canada');

-- Creating the 'country_count' table
CREATE TABLE country_count (
    cca3 VARCHAR(3) PRIMARY KEY,
    click_amount INT DEFAULT 0,
    -- country_name VARCHAR(100) NOT NULL, -- Delete from database
    -- user_id INT REFERENCES user_profile(user_id) ON DELETE CASCADE --Delete from database
);

-- Inserting sample data into 'country_count'
INSERT INTO country_count (cca3, click_amount, country_name)
VALUES ('France', 1),
       ('Japan', 1),
       ('Canada', 1);

-- Sample query to get all users
SELECT * FROM users;

-- Sample query to get saved countries for a specific user
SELECT country_name FROM saved_countries WHERE user_id = 1;

-- Sample query to get the most saved countries
SELECT * FROM country_counts ORDER BY save_count DESC;
