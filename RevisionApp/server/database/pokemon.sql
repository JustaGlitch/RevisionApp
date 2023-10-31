DROP TABLE IF EXISTS pokemon;

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