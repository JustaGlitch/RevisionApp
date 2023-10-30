const db = require("../database/connect");

class Collection {
    constructor(collection_id, poked_id, user_id) {
        this.collection_id = collection_id;
        this.poked_id = poked_id;
        this.user_id = user_id;
        this.tableName = "collection";
    }

    // Create a new collection entry
    async create() {
        try {
            const result = await db.query(
                `INSERT INTO ${this.tableName} (poked_id, user_id) VALUES ($1, $2) RETURNING collection_id`,
                [this.poked_id, this.user_id]
            );
            this.collection_id = result.rows[0].collection_id;
            return this;
        } catch (error) {
            console.error("Error creating collection entry:", error);
            throw error;
        }
    }

    // Fetch a collection entry by its collection_id
    static async findById(collection_id) {
        try {
            const result = await db.query(
                `SELECT * FROM ${this.tableName} WHERE collection_id = $1`,
                [collection_id]
            );
            if (result.rows.length === 0) return null;
            const collectionData = result.rows[0];
            return new Collection(collectionData.collection_id, collectionData.poked_id, collectionData.user_id);
        } catch (error) {
            console.error("Error finding collection entry by ID:", error);
            throw error;
        }
    }

    // Update a collection entry's details
    async update() {
        try {
            await db.query(
                `UPDATE ${this.tableName} SET poked_id = $1, user_id = $2 WHERE collection_id = $3`,
                [this.poked_id, this.user_id, this.collection_id]
            );
        } catch (error) {
            console.error("Error updating collection entry:", error);
            throw error;
        }
    }

    // Delete a collection entry by its collection_id
    async delete() {
        try {
            await db.query(`DELETE FROM ${this.tableName} WHERE collection_id = $1`, [this.collection_id]);
        } catch (error) {
            console.error("Error deleting collection entry:", error);
            throw error;
        }
    }

    // Fetch all pokemons for a given user_id
    static async findByUserId(user_id) {
        try {
            const result = await db.query(
                `SELECT * FROM ${this.tableName} WHERE user_id = $1`,
                [user_id]
            );
            return result.rows;
        } catch (error) {
            console.error("Error fetching collection for user:", error);
            throw error;
        }
    }
}

module.exports = Collection;
