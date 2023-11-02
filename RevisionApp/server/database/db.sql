-- Drop tables
DROP TABLE IF EXISTS token CASCADE;
DROP TABLE IF EXISTS collection CASCADE;
DROP TABLE IF EXISTS study_sessions CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS students CASCADE;
DROP TABLE IF EXISTS student_user CASCADE;
DROP TABLE IF EXISTS class CASCADE;
DROP TABLE IF EXISTS pokemon CASCADE;
DROP TABLE IF EXISTS admin CASCADE;


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
    classname VARCHAR(255),
    FOREIGN KEY (admin_id) REFERENCES admin(admin_id)
);

-- Student User table
CREATE TABLE student_user (
    user_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, 
    classname VARCHAR(255),
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
    FOREIGN KEY (admin_id) REFERENCES admin(admin_id),
    FOREIGN KEY (user_id) REFERENCES student_user(user_id)
);

-- Tasks table
CREATE TABLE tasks (
    task_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    admin_id INT,
    user_id INT,
    class_id INT,
    completed BOOLEAN,
    suggested_time INT,
    taskCreated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES admin(admin_id),
    FOREIGN KEY (user_id) REFERENCES student_user(user_id),
    FOREIGN KEY (class_id) REFERENCES class(class_id)
);

-- Study sessions table
CREATE TABLE study_sessions (
    session_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INT,
    duration INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES student_user(user_id)
);

-- Pokémon table
CREATE TABLE pokemon (
    pokemon_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    evolution_stage VARCHAR(50),  -- 'baby', 'middle', 'final'
    evolves_to INT,               -- Reference to the ID of the evolved form
    study_time INT,              -- Time in minutes
    sprite_url VARCHAR(500),
    threeD_url VARCHAR(500),
    FOREIGN KEY (evolves_to) REFERENCES pokemon(pokemon_id)
);

-- Collection table
CREATE TABLE collection (
    collection_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    pokemon_id INT,
    user_id INT,
    name VARCHAR(500),
    sprite_url VARCHAR(500),
    FOREIGN KEY (pokemon_id) REFERENCES pokemon(pokemon_id),
    FOREIGN KEY (user_id) REFERENCES student_user(user_id),
    CONSTRAINT combo UNIQUE (pokemon_id, user_id)
);

ALTER TABLE students
ADD CONSTRAINT students_user_id_fkey_new  -- Change the name here
FOREIGN KEY (user_id) REFERENCES student_user(user_id)
ON DELETE SET NULL;

ALTER TABLE class
DROP CONSTRAINT class_admin_id_fkey;

ALTER TABLE class
ADD CONSTRAINT class_admin_id_fkey
FOREIGN KEY (admin_id) REFERENCES admin(admin_id)
ON DELETE SET NULL;

ALTER TABLE tasks
DROP CONSTRAINT tasks_admin_id_fkey;

ALTER TABLE tasks
ADD CONSTRAINT tasks_admin_id_fkey
FOREIGN KEY (admin_id) REFERENCES admin(admin_id)
ON DELETE SET NULL;

ALTER TABLE token ADD CONSTRAINT i FOREIGN KEY(admin_id) REFERENCES admin(admin_id);


-- Dummy data insertion
INSERT INTO admin (username, password) 
VALUES ('adminUser', 'password123'),
         ('admin1', 'password1'),
         ('admin2', 'password2'),
         ('admin3', 'password3'),
         ('admin4', 'password4'),
         ('admin5', 'password5'),
         ('admin6', 'password6'),
         ('admin7', 'password7'),
         ('admin8', 'password8'),
         ('admin9', 'password9'),
         ('admin10', 'password10');


INSERT INTO class (admin_id, classname) 
VALUES (1, 'class1'),
         (2, 'class2'),
         (5, 'class3'),
         (5, 'class4'),
         (6, 'class5'),
         (7, 'class6'),
         (9, 'class7'),
         (10, 'class8'),
         (2, 'class9'),
         (3, 'class10');




INSERT INTO student_user (username, password, current_poked, classname)
VALUES
('student1', 'password1', 6, 'class1'),
('student2', 'password2', 6, 'class1'),
('student3', 'password3', 6, 'class2'),
('student4', 'password4', 9, 'class2'),
('student5', 'password5', 9, 'class3'),
('student6', 'password6', 9, 'class3'),
('student7', 'password7', 4, 'class4'),
('student8', 'password8', 9, 'class4'),
('student9', 'password9', 9, 'class5'),
('student10', 'password10', 9, 'class5'),
('student11', 'password11', 9, 'class6'),
('student12', 'password12', 9, 'class6'),
('student13', 'password13', 9, 'class7'),
('student14', 'password14', 2, 'class7'),
('student15', 'password15', 4, 'class8'),
('student16', 'password16', 9, 'class8'),
('student17', 'password17', 9, 'class9'),
('student18', 'password18', 9, 'class9'),
('student19', 'password19', 9, 'class10'),
('student20', 'password20', 2, 'class10'),
('student21', 'password21', 9, 'class1'),
('student22', 'password22', 9, 'class1'),
('student23', 'password23', 9, 'class2'),
('student24', 'password24', 9, 'class2'),
('student25', 'password25', 2, 'class3');

INSERT INTO students (user_id, class_id) 
VALUES (1, 1),
            (2, 1),
            (3, 1),
            (4, 1),
            (5, 1),
            (6, 2),
            (7, 2),
            (8, 2),
            (9, 2),
            (10, 2),
            (11, 3),
            (12, 3),
            (13, 3),
            (14, 3),
            (15, 3),
            (16, 4),
            (17, 4),
            (18, 4),
            (19, 4),
            (20, 4),
            (21, 5),
            (22, 5),
            (23, 5),
            (24, 5),
            (25, 5);

-- Insert the baby Pokemon
-- INSERT INTO pokemon (name, evolution_stage) VALUES (9, 'baby');

-- -- Insert final evolutions first (evolves_to is NULL and study_time can be NULL or 0)
-- INSERT INTO pokemon (name, evolution_stage, evolves_to, study_time)
-- VALUES ('Charizard', 'final', NULL, NULL),
--        ('Blastoise', 'final', NULL, NULL);

-- -- Insert middle evolutions next
-- INSERT INTO pokemon (name, evolution_stage, evolves_to, study_time)
-- VALUES ('Charmeleon', 'middle', (SELECT pokemon_id FROM pokemon WHERE name = 'Charizard'), 60),
--        ('Wartortle', 'middle', (SELECT pokemon_id FROM pokemon WHERE name = 'Blastoise'), 60);

-- -- Insert baby evolutions last
-- INSERT INTO pokemon (name, evolution_stage, evolves_to, study_time)
-- VALUES ('Charmander', 'baby', (SELECT pokemon_id FROM pokemon WHERE name = 'Charmeleon'), 30),
--        ('Squirtle', 'baby', (SELECT pokemon_id FROM pokemon WHERE name = 'Wartortle'), 30);

-- -- Inserting dummy data into the pokemon table
-- INSERT INTO pokemon (name, evolution_stage, evolves_to, study_time)
-- VALUES 
-- ('Bulbasaur', 'baby', NULL, 15),
-- ('Ivysaur', 'middle', NULL, 30),
-- ('Venusaur', 'final', NULL, 45),
-- ('Charmander', 'baby', NULL, 15),
-- ('Charmeleon', 'middle', NULL, 30),
-- ('Charizard', 'final', NULL, 45);

-- Inserting dummy data into the collection table
-- THIS HAD TO BE MOVED TO SETUP
-- INSERT INTO collection (pokemon_id, user_id)
-- VALUES 
-- (1, 1), -- User 1 has Bulbasaur
-- (4, 1), -- User 1 also has Charmander
-- (2, 2), -- User 2 has Ivysaur
-- (3, 3); -- User 3 has Venusaur

-- Inserting dummy data into the tasks table
INSERT INTO tasks (title, description, admin_id, user_id, class_id, completed, suggested_time, taskCreated_at)
VALUES
('Task 1', 'Description 1', 1, 1, 1, FALSE, 30, CURRENT_TIMESTAMP),
('Task 2', 'Description 2', 1, 2, 1, TRUE, 30, CURRENT_TIMESTAMP),
('Task 3', 'Description 3', 1, 3, 1, FALSE, 30, CURRENT_TIMESTAMP),
('Task 4', 'Description 4', 1, 4, 1, FALSE, 30, CURRENT_TIMESTAMP),
('Task 5', 'Description 5', 1, 5, 1, FALSE, 30, CURRENT_TIMESTAMP),

('Task 6', 'Description 6', 1, 6, 2, TRUE, 30, CURRENT_TIMESTAMP),
('Task 7', 'Description 7', 1, 7, 2, FALSE, 30, CURRENT_TIMESTAMP),
('Task 8', 'Description 8', 1, 8, 2, TRUE, 30, CURRENT_TIMESTAMP),
('Task 9', 'Description 9', 1, 9, 2, FALSE, 30, CURRENT_TIMESTAMP),
('Task 10', 'Description 10', 1, 10, 2, TRUE, 30, CURRENT_TIMESTAMP);



-- Inserting dummy data into the study_sessions table
INSERT INTO study_sessions (user_id, duration)
VALUES
(1, 30),
(2, 30);

