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
VALUES (1, 'Class 1'),
         (2, 'Class 2'),
         (5, 'Class 3'),
         (5, 'Class 4'),
         (6, 'Class 5');




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
('student9', 'password9', 9, 'class5');

INSERT INTO students (user_id, class_id) 
VALUES (1, 1),
            (2, 1),
            (3, 1),
            (4, 1),
            (5, 1),
            (6, 2);

-- Inserting dummy data into the tasks table
INSERT INTO tasks (title, description, admin_id, user_id, class_id, completed, suggested_time, taskCreated_at)
VALUES
('Task 1', 'A set of exercises on Mathematics to enhance problem-solving and numerical skills.', 1, 1, 1, FALSE, 30, CURRENT_TIMESTAMP),
('Task 2', 'A series of Science tasks aimed at understanding natural phenomena through experiments and observations.', 1, 2, 1, TRUE, 30, CURRENT_TIMESTAMP),
('Task 3', 'English assignments focused on improving grammar, writing skills, and literary analysis.', 1, 3, 1, FALSE, 30, CURRENT_TIMESTAMP),
('Task 4', 'History tasks to study significant events, figures, and timelines from the past.', 1, 4, 1, FALSE, 30, CURRENT_TIMESTAMP),
('Task 5', 'Geographical studies covering physical landscapes, human-environment interactions, and map skills.', 1, 5, 1, FALSE, 30, CURRENT_TIMESTAMP),

('Task 6', 'ICT coursework to develop computer literacy and understanding the role of technology in society.', 1, 6, 2, TRUE, 30, CURRENT_TIMESTAMP),
('Task 7', 'Computer Science projects that cover programming, algorithms, and computational theory.', 1, 7, 2, FALSE, 30, CURRENT_TIMESTAMP),
('Task 8', 'Technology-based tasks that involve the application of engineering principles and design.', 1, 8, 2, TRUE, 30, CURRENT_TIMESTAMP),
('Task 9', 'Artistic tasks that involve creative expression through various mediums and art studies.', 1, 9, 2, FALSE, 30, CURRENT_TIMESTAMP),
('Task 10', 'Drama and theatre activities including script analysis, acting, and studying stagecraft.', 1, 1, 2, TRUE, 30, CURRENT_TIMESTAMP);



-- Inserting dummy data into the study_sessions table
INSERT INTO study_sessions (user_id, duration)
VALUES
(1, 30),
(2, 30);

