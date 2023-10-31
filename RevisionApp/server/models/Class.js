const db = require("../database/connect");

class Class {
    static tableName = "class";

    constructor(class_id, admin_id) {
        this.class_id = class_id;
        this.admin_id = admin_id;
    }

    async create() {
        const query = `INSERT INTO ${Class.tableName} (admin_id) VALUES ($1) RETURNING *`;
        const values = [this.admin_id];

        try {
            const result = await db.query(query, values);
            this.class_id = result.rows[0].class_id;
            return this;
        } catch (err) {
            console.error("Error inserting class:", err);
            throw err;
        }
    }

    async getById() {
        const query = `SELECT * FROM ${Class.tableName} WHERE class_id = $1`;
        const values = [this.class_id];

        try {
            const result = await db.query(query, values);
            this.admin_id = result.rows[0].admin_id;
            return this;
        } catch (err) {
            console.error("Error fetching class:", err);
            throw err;
        }
    }

    async updateAdmin() {
        const query = `UPDATE ${Class.tableName} SET admin_id = $1 WHERE class_id = $2 RETURNING *`;
        const values = [this.admin_id, this.class_id];

        try {
            const result = await db.query(query, values);
            this.admin_id = result.rows[0].admin_id;
            return this;
        } catch (err) {
            console.error("Error updating class:", err);
            throw err;
        }
    }

    async destroy() {
        const query = `DELETE FROM ${Class.tableName} WHERE class_id = $1`;
        const values = [this.class_id];

        try {
            await db.query(query, values);
        } catch (err) {
            console.error("Error deleting class:", err);
            throw err;
        }
    }
}

module.exports = Class;
