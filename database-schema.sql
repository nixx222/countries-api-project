-- Creating the 'users' table
CREATE TABLE user_profile (
    user_id INTEGER PRIMARY KEY, 
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    country VARCHAR(100) NOT NULL,
    bio VARCHAR(100) NOT NULL
);


-- Inserting sample data into 'users'
INSERT INTO users (username, email, country, bio)
VALUES ('Phoenix', 'phoenix@example.com', 'USA', 'I enjoy travel'),
       

-- Creating the 'saved_countries' table
CREATE TABLE saved_countries (
    save_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    country_name VARCHAR(100) NOT NULL
);

-- Inserting sample data into 'saved_countries'
INSERT INTO saved_countries (cca3, user_id, country_name) VALUES ('FRA', 1, 'France')

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
