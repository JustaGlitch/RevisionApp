const { v4: uuidv4 } = require("uuid");

const db = require("../database/connect");

class Token {

    constructor({ token_id, user_id, admin_id, token }){
        this.token_id = token_id;
        this.user_id = user_id;
        this.admin_id = admin_id;
        this.token = token;
    }

    static async create(id, type) {
        const token = uuidv4();
        let column = type === 'admin' ? 'admin_id' : 'user_id';
        const response = await db.query(`INSERT INTO token (${column}, token) VALUES ($1, $2) RETURNING token_id;`, [id, token]);
        const newId = response.rows[0].token_id;
        return await Token.getOneById(newId);
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM token WHERE token_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate token.");
        } else {
            return new Token(response.rows[0]);
        }
    }

    static async getOneByToken(token) {
        const response = await db.query("SELECT * FROM token WHERE token = $1", [token]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate token.");
        } else {
            return new Token(response.rows[0]);
        }
    }

    static async cleanupOldTokens(hours = 24) {
        await db.query("DELETE FROM token WHERE created_at < NOW() - INTERVAL '$1 hours'", [hours]);
    }
    

}

module.exports = Token;