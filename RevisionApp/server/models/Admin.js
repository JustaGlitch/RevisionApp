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
        const response = await db.query(`SELECT admin.* FROM admin 
                                         JOIN token ON admin.admin_id = token.admin_id 
                                         WHERE token.token = $1`, [token]);
        if (response.rows.length != 1) {
            throw new Error("Admin not found");
        }
        return new Admin(response.rows[0])
    }

    static async create(data) {
        const { username, password } = data;
        const response = await db.query("INSERT INTO admin (username, password) VALUES ($1, $2) RETURNING *", [username, password]);
        const newId = response.rows[0].admin_id;
        return Admin.getAdminId(newId);
    }

}

module.exports = Admin;
