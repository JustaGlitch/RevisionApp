-- Drop tables
DROP TABLE IF EXISTS token;
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
    password VARCHAR(255) NOT NULL  
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
    password VARCHAR(255) NOT NULL, 
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

-- Token table
CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INT, 
    admin_id INT,
    token VARCHAR(36) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES student_user(user_id),
    FOREIGN KEY (admin_id) REFERENCES admin(admin_id)
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
    image_url VARCHAR(500),
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

INSERT INTO student_user (username, password, current_poked)
VALUES
('student1', 'password1', 'Pikachu'),
('student2', 'password2', 'Pikachu'),
('student3', 'password3', 'Pikachu'),
('student4', 'password4', 'Pikachu'),
('student5', 'password5', 'Pikachu');

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

-- Inserting dummy data into the pokemon table
INSERT INTO pokemon (name, evolution_stage, evolves_to, study_time)
VALUES 
('Bulbasaur', 'baby', NULL, 15),
('Ivysaur', 'middle', NULL, 30),
('Venusaur', 'final', NULL, 45),
('Charmander', 'baby', NULL, 15),
('Charmeleon', 'middle', NULL, 30),
('Charizard', 'final', NULL, 45);

-- Inserting dummy data into the collection table
INSERT INTO collection (poked_id, user_id)
VALUES 
(1, 1), -- User 1 has Bulbasaur
(4, 1), -- User 1 also has Charmander
(2, 2), -- User 2 has Ivysaur
(3, 3); -- User 3 has Venusaur

