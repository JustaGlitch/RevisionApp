const db = require("../database/connect");
// let fetch;
// import('node-fetch').then(module => fetch = module.default);

class Pokemon {
    constructor({pokemon_id, name, evolution_stage, evolves_to, study_time, sprite_url, threed_url}) {
        this.pokemon_id = pokemon_id;
        this.name = name;
        this.evolution_stage = evolution_stage;
        this.evolves_to = evolves_to;
        this.study_time = study_time;
        this.sprite_url = sprite_url;
        this.threeD_url = threed_url;
    }

    // static async fetchSpriteURL(pokemonName) {
    //     try {
    //         const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    //         const data = await response.json();
    //         console.log("Fetched Pokémon sprite URL:", data.sprites.front_default);  
    //         return data.sprites.front_default;
    //     } catch (error) {
    //         console.error("Failed to fetch Pokémon sprite:", error);
    //         throw error;
    //     }
    // }
    
    // async create() {
    //     if (!this.image_url) {
    //         this.image_url = await Pokemon.fetchSpriteURL(this.name);
    //     }
    //     try {
    //         console.log(`Inserting: ${this.name}, ${this.evolution_stage}, ${this.evolves_to}, ${this.study_time}, ${this.image_url}`);

    //         const result = await db.query(
    //             `INSERT INTO $pokemon} (name, evolution_stage, evolves_to, study_time, image_url) 
    //              VALUES ($1, $2, $3, $4, $5) 
    //              RETURNING pokemon_id`,
    //             [this.name, this.evolution_stage, this.evolves_to, this.study_time, this.image_url]
    //         );
    //         this.pokemon_id = result.rows[0].pokemon_id;
    //         return this;
    //     } catch (error) {
    //         console.error("Error creating Pokémon:", error);
    //         throw error;
    //     }
    // }
    
    static async getNewBaby() {
        try {
            const result = await db.query(`SELECT * FROM pokemon WHERE evolution_stage = 'baby'`)
            const random = Math.floor(Math.random() * result.rowCount)
            const pokemonData = result.rows[random]
            return new Pokemon(pokemonData)
        } catch (error) {
            console.error("Error getting new baby:", error)
            throw error;
        }
    }

    static async getAllPokemon() {
        const result = await db.query(`SELECT * FROM pokemon`)
        return result.rows
    }
    static async getAllBabyPokemon() {
        const result = await db.query(`SELECT * FROM pokemon WHERE evolution_stage = 'baby'`)
        return result.rows
    }

    static async findBabyVersion(id) {
        try {
            const middleResult = await db.query(`SELECT * FROM pokemon WHERE evolves_to = $1`,[id])
            const babyResult = await db.query(`SELECT * FROM pokemon WHERE evolves_to = $1`, [middleResult.rows[0].pokemon_id])
            let pokemonData
            if(babyResult.rowCount == 1){
                pokemonData = babyResult.rows[0].pokemon_id
            }else{
                pokemonData = middleResult.rows[0].pokemon_id
            }
            return pokemonData
        } catch (error) {
            console.error("Error getting baby version:", error)
            throw error;
        }
    }

    static async findById(pokemon_id) {
        try {
            const result = await db.query(`SELECT * FROM pokemon WHERE pokemon_id = $1`,[pokemon_id]);
            if (result.rowCount === 0) return null;
            const pokemonData = result.rows[0];
            console.log(pokemonData)
            return new Pokemon(pokemonData);
        } catch (error) {
            console.error("Error finding Pokémon by ID:", error);
            throw error;
        }
    }

    async checkForEvolution(studyTime) {
        if (studyTime >= this.study_time && this.evolves_to) {
            return await this.evolve();
        }
        if(this.evolves_to == null){
            return "add to collection"
        }
        return "can not evolve"
    }

    async evolve() {
        try {
            const evolvedPokemon = await Pokemon.findById(this.evolves_to);

            // this.name = evolvedPokemon.name;
            // this.evolution_stage = evolvedPokemon.evolution_stage;
            // this.evolves_to = evolvedPokemon.evolves_to;
            // this.image_url = await Pokemon.fetchSpriteURL(this.name);

            // await this.update();

            return evolvedPokemon
        } catch (error) {
            console.error("Error during Pokémon evolution:", error);
            throw error;
        }
    }

    async update() {
        try {
            await db.query(
                `UPDATE pokemon SET name = $1, evolution_stage = $2, evolves_to = $3, sprite_url = $4, threeD_url = $5 WHERE pokemon_id = $6`,
                [this.name, this.evolution_stage, this.evolves_to, this.sprite_url, this.threeD_url, this.pokemon_id]
            );
        } catch (error) {
            console.error("Error updating Pokémon:", error);
            throw error;
        }
    }

    async destroy() {
        try {
            await db.query(
                `DELETE FROM pokemon WHERE pokemon_id = $1`,
                [this.pokemon_id]
            );
        } catch (error) {
            console.error("Error deleting Pokémon:", error);
            throw error;
        }
    }
}

module.exports = Pokemon;

// Mock data for demonstration purposes:
// const testPokemon = new Pokemon(null, "bulbasaur", 1, null, 0);
// testPokemon.create().then(() => {
//     console.log("Successfully created test Pokémon.");
// }).catch((error) => {
//     console.error("Error:", error);
// });

