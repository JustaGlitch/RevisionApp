const db = require("../database/connect");

class Admin {
    constructor(admin_id, username, password) {
        this.admin_id = admin_id;
        this.username = username;
        this.password = password; 
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
        // First, retrieve the token record to get the associated admin_id
        const tokenResponse = await db.query("SELECT * FROM token WHERE token = $1", [token]);
        if (tokenResponse.rows.length != 1) {
            throw new Error("Token not found");
        }
        const adminId = tokenResponse.rows[0].admin_id;
    
        // Now, retrieve the admin record using the admin_id obtained from the token table
        const adminResponse = await db.query("SELECT * FROM admin WHERE admin_id = $1", [adminId]);
        if (adminResponse.rows.length != 1) {
            throw new Error("Admin not found");
        }
        return new Admin(adminResponse.rows[0]);
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
