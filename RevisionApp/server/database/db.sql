-- Drop tables
DROP TABLE IF EXISTS collection;
DROP TABLE IF EXISTS study_sessions;
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS student_user;
DROP TABLE IF EXISTS class;
DROP TABLE IF EXISTS pokemon;
DROP TABLE IF EXISTS admin;

-- Admin table
CREATE TABLE admin (
    admin_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL  -- Ideally store a hashed password
);

-- Class table
CREATE TABLE class (
    class_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    admin_id INT,
    FOREIGN KEY (admin_id) REFERENCES admin(admin_id)
);

-- Student User table
CREATE TABLE student_user (
    user_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,  -- Ideally store a hashed password
    current_poked VARCHAR(255)
);

-- Students table
CREATE TABLE students (
    student_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INT,
    class_id INT,
    FOREIGN KEY (user_id) REFERENCES student_user(user_id),
    FOREIGN KEY (class_id) REFERENCES class(class_id)
);

-- Tasks table
CREATE TABLE tasks (
    task_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    admin_id INT,
    user_id INT,
    completed BOOLEAN,
    suggested_time TIME,
    FOREIGN KEY (admin_id) REFERENCES admin(admin_id),
    FOREIGN KEY (user_id) REFERENCES student_user(user_id)
);

-- Study sessions table
CREATE TABLE study_sessions (
    session_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INT,
    duration TIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES student_user(user_id)
);

-- Pokémon table
CREATE TABLE pokemon (
    pokemon_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    evolution_stage VARCHAR(50),  -- 'baby', 'middle', 'final'
    evolves_to INT,               -- Reference to the ID of the evolved form
    study_time INT,              -- Time in minutes
    FOREIGN KEY (evolves_to) REFERENCES pokemon(pokemon_id)
);

-- Collection table
CREATE TABLE collection (
    collection_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    poked_id INT,
    user_id INT,
    FOREIGN KEY (poked_id) REFERENCES pokemon(pokemon_id),
    FOREIGN KEY (user_id) REFERENCES student_user(user_id)
);

-- Dummy data insertion
INSERT INTO admin (username, password) VALUES ('adminUser', 'password123');
INSERT INTO class (admin_id) VALUES (1);
INSERT INTO student_user (username, password, current_poked) VALUES ('studentUser1', 'pass1234', 'Pikachu');
INSERT INTO students (user_id, class_id) VALUES (1, 1);
-- Insert the baby Pokemon
INSERT INTO pokemon (name, evolution_stage) VALUES ('Pikachu', 'baby');

-- Insert final evolutions first (evolves_to is NULL and study_time can be NULL or 0)
INSERT INTO pokemon (name, evolution_stage, evolves_to, study_time)
VALUES ('Charizard', 'final', NULL, NULL),
       ('Blastoise', 'final', NULL, NULL);

-- Insert middle evolutions next
INSERT INTO pokemon (name, evolution_stage, evolves_to, study_time)
VALUES ('Charmeleon', 'middle', (SELECT pokemon_id FROM pokemon WHERE name = 'Charizard'), 60),
       ('Wartortle', 'middle', (SELECT pokemon_id FROM pokemon WHERE name = 'Blastoise'), 60);

-- Insert baby evolutions last
INSERT INTO pokemon (name, evolution_stage, evolves_to, study_time)
VALUES ('Charmander', 'baby', (SELECT pokemon_id FROM pokemon WHERE name = 'Charmeleon'), 30),
       ('Squirtle', 'baby', (SELECT pokemon_id FROM pokemon WHERE name = 'Wartortle'), 30);
