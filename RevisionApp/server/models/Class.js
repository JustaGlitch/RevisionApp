const db = require("../database/connect");

class Class {
    constructor(data) {
        this.class_id = data.class_id;
        this.admin_id = data.admin_id;
        this.classname = data.classname;
    }

    static async getById(id) {
        const response = await db.query(`SELECT * FROM class WHERE class_id = $1`, [id]);
        if (response.rows.length != 1) {
            throw new Error("Class not found");
        }
        return new Class(response.rows[0]);
    }

    static async getAll() {
        const response = await db.query(`SELECT * FROM class`);
        return response.rows.map(row => new Class(row));
    }

    static async create(data) {
        const { admin_id, classname } = data;
        const response = await db.query(`INSERT INTO class (admin_id, classname) VALUES ($1, $2) RETURNING *`, [admin_id, classname]);
        const newId = response.rows[0].class_id;
        return Class.getById(newId);
    }

    async update() {
        const response = await db.query(`UPDATE class SET admin_id = $1, classname = $2 WHERE class_id = $3 RETURNING *`, [this.admin_id, this.classname, this.class_id]);
        return new Class(response.rows[0]);
    }

    async destroy() {
        await db.query("DELETE FROM class WHERE class_id = $1", [this.class_id]);
    }
}

module.exports = Class;
