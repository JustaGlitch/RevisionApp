const db = require("../database/connect");

class StudentUser {
    constructor(user_id, username, password, current_poked) {
        this.user_id = user_id;
        this.username = username;
        this.password = password; 
        this.current_poked = current_poked;
    }

    static async getUserId(id){
        const response = await db.query("SELECT * FROM student_user WHERE user_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Student not found");
        }
        return new StudentUser(response.rows[0]);
    }

    static async getUserUsername(username){
        const response = await db.query("SELECT * FROM student_user WHERE username = $1", [username]);
        if (response.rows.length != 1) {
            throw new Error("Student not found");
        }
        return new StudentUser(response.rows[0]);
    }
    

    // You might need to join with the token table or modify your schema for this method to work
    static async getOneByToken(token) {
        const response = await db.query("SELECT * FROM student_user WHERE token = $1", [token]);
        if (response.rows.length != 1) {
            throw new Error("Student not found");
        }
        return new StudentUser(...response.rows[0]);
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM admin");
        return response.rows.map(row => new StudentUser(row));
    }

    static async create(data) {
        const { username, password } = data;
        const response = await db.query("INSERT INTO student_user (username, password) VALUES ($1, $2) RETURNING *", [username, password]);
        return new StudentUser(...response.rows[0]);
    }

    static async updatePoke(user_id) {
        const response = await db.query("UPDATE student_user SET current_poked = true WHERE user_id = $1 RETURNING *", [user_id]);
        return new StudentUser(...response.rows[0]);
    }

    async update() {
        const response = await db.query("UPDATE student_user SET username = $1, password = $2 WHERE user_id = $3 RETURNING *", [this.username, this.password, this.user_id]);
        return new StudentUser(...response.rows[0]);
    }

    async destroy() {
        await db.query("DELETE FROM student_user WHERE user_id = $1", [this.user_id]);
    }
}

module.exports = StudentUser;
