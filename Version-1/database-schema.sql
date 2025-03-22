-- Country Count: cca3, click amount, country_name, user_id
-- User Profile: user ID, username, email, bio, Country, *Country Count ? 
-- Saved Countries: cca3, user_id, country_name, img, population, capital, region,

-- In 3 separate tables: Country Count, User Profile, Saved Countries

-- Queries:
-- - Get all countries
-- - Get all countries by user
-- - Get all users
-- - Get all users by country
-- - Get all saved countries by user
-- - Get all saved countries by country
-- - Get all saved countries by user and country
-- - Get all saved countries by user and country count
-- What countries have been saved?
-- What countries have been saved by user?
-- What data has the user submitted?
-- Select name, email FROM user_table 


--  Country Count table

CREATE TABLE CountryCount (
    cca3 VARCHAR(3) PRIMARY KEY,
    click_ amount INT,
    country_name VARCHAR(255),
    user_id INT,
);

INSERT INTO CountryCount (cca3, click_amount, country_name, user_id) 
VALUES ('USA', 100, 'United States', 1), ('CAN', 50, 'Canada', 2), ('GBR', 75, 'United Kingdom', 3);

--  User Profile table
CREATE TABLE UserProfile (
    user_id INT PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255),
    bio TEXT,
    country VARCHAR(255),
    country_count INT,
);

INSERT INTO UserProfile (user_id, username, email, bio, country, country_count) 
VALUES (1, 'john_doe', 'john.doe@example.com', 'I am a software developer', 'United States', 100), 
(2, 'jane_smith', 'jane.smith@example.com', 'I love traveling', 'Canada', 50), 
(3, 'alex_wilson', 'alex.wilson@example.com', 'Exploring the world', 'United Kingdom', 75);

-- Saved Countries table
CREATE TABLE SavedCountries (
    cca3 VARCHAR(3),
    user_id INT,
    country_name VARCHAR(255),
    img VARCHAR(255),
    population INT,
    capital VARCHAR(255),
    region VARCHAR(255),
);

INSERT INTO SavedCountries (cca3, user_id, country_name, img, population, capital, region) 
VALUES ('USA', 1, 'United States', 'usa.jpg', 331002651, 'Washington, D.C.', 'Americas'), 
('CAN', 2, 'Canada', 'canada.jpg', 37742154, 'Ottawa', 'Americas'), 
('GBR', 3, 'United Kingdom', 'uk.jpg', 67886011, 'London', 'Europe');

-- Get all countries
SELECT * FROM CountryCount;

-- Get all countries by user
SELECT cc.* FROM CountryCount cc
JOIN SavedCountries sc ON cc.cca3 = sc.cca3
WHERE sc.user_id = $USER_ID$;

-- Get all users
SELECT * FROM UserProfile;

-- Get all users by country
SELECT up.* FROM UserProfile up
JOIN SavedCountries sc ON up.user_id = sc.user_id
WHERE sc.cca3 = $CCA3$;

-- Get all saved countries by user
SELECT * FROM SavedCountries
WHERE user_id = $USER_ID$;

-- Get all saved countries by country
SELECT * FROM SavedCountries
WHERE cca3 = $CCA3$;

-- Get all saved countries by user and country
SELECT * FROM SavedCountries
WHERE user_id = $USER_ID$ AND cca3 = $CCA3$;

-- Get all saved countries by user and country count
SELECT sc.* FROM SavedCountries sc
JOIN CountryCount cc ON sc.cca3 = cc.cca3
WHERE sc.user_id = $USER_ID$ AND cc.click_amount = $CLICK_AMOUNT$;

-- What countries have been saved?
SELECT DISTINCT country_name FROM SavedCountries;

-- What countries have been saved by user?
SELECT DISTINCT country_name FROM SavedCountries
WHERE user_id = $USER_ID$;

-- What data has the user submitted?
SELECT username, email FROM UserProfile
WHERE user_id = $USER_ID$;




