const db = require("../database/connect");

class Collection {
    constructor({collection_id, pokemon_id, user_id}) {
        this.collection_id = collection_id;
        this.pokemon_id = pokemon_id;
        this.user_id = user_id;
    }

    // Create a new collection entry
    static async create({pokemon_id, name, sprite_url},user_id) {
        try {
            const result = await db.query(
                `INSERT INTO collection (pokemon_id, user_id, name, sprite_url) VALUES ($1, $2, $3, $4) RETURNING *`,
                [pokemon_id, user_id, name, sprite_url]
            );
            const collectionData = result.rows[0]
            return new Collection(collectionData);
        } catch (error) {
            console.error("Error creating collection entry:", error);
            throw error;
        }
    }

    // Fetch a collection entry by its collection_id
    static async findById(collection_id) {
        try {
            const result = await db.query(
                `SELECT * FROM collection WHERE collection_id = $1`,
                [collection_id]
            );
            if (result.rows.length === 0) return null;
            const collectionData = result.rows[0];
            return new Collection(collectionData);
        } catch (error) {
            console.error("Error finding collection entry by ID:", error);
            throw error;
        }
    }

    // Update a collection entry's details
    async update() {
        try {
            await db.query(
                `UPDATE collection SET pokemon_id = $1, user_id = $2 WHERE collection_id = $3`,
                [this.pokemon_id, this.user_id, this.collection_id]
            );
        } catch (error) {
            console.error("Error updating collection entry:", error);
            throw error;
        }
    }

    // Delete a collection entry by its collection_id
    async destroy() {
        try {
            await db.query(
                `DELETE FROM collection WHERE collection_id = $1`,
                [this.collection_id]
            );
        } catch (error) {
            console.error("Error deleting collection entry:", error);
            throw error;
        }
    }

    // Fetch all pokemons for a given user_id
    static async findByUserId(user_id) {
        try {
            const result = await db.query(
                `SELECT * FROM collection WHERE user_id = $1`,
                [user_id]
            );
            if (result.rows.length === 0) return null;
            return result.rows;
        } catch (error) {
            console.error("Error fetching collection for user:", error);
            throw error;
        }
    }
}

module.exports = Collection;
