const db = require("../database/connect");

class Admin {
    constructor(data) {
        this.admin_id = data.admin_id;
        this.username = data.username;
        this.password = data.password; 
    }
    
    static async getAdminId(id){
        const response = await db.query("SELECT * FROM admin WHERE admin_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Admin not found");
        }
        return new Admin(response.rows[0])
    }

    static async getAdminUsername(username){
        const response = await db.query("SELECT * FROM admin WHERE username = $1", [username]);
        if (response.rows.length != 1) {
            throw new Error("Admin not found");
        }
        return new Admin(response.rows[0])
    }

    static async getOneByToken(token) {
        const response = await db.query("SELECT admin_id FROM token WHERE token = $1", [token]);
        if (response.rows.length != 1) {
            throw new Error("Admin not found");
        }
        const admin = await Admin.getAdminId(response.rows[0].admin_id);
        return admin;
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM admin");
        return response.rows.map(row => new Admin(row));
    }
    

    static async create(data) {
        const { username, password } = data;
        const response = await db.query("INSERT INTO admin (username, password) VALUES ($1, $2) RETURNING *", [username, password]);
        const newId = response.rows[0].admin_id;
        return Admin.getAdminId(newId);
    }

    async update() {
        const response = await db.query("UPDATE admin SET username = $1, password = $2 WHERE admin_id = $3 RETURNING *", [this.username, this.password, this.admin_id]);
        return new Admin(response.rows[0]);
    }

    async destroy() {
        await db.query("DELETE FROM admin WHERE admin_id = $1", [this.admin_id]);
    }

}

module.exports = Admin;
