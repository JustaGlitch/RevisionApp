const db = require("../database/connect");

class StudySession {
    constructor(session_id, user_id, duration) {
        this.session_id = session_id;
        this.user_id = user_id;
        this.duration = duration;
    }

    // Fetch all study sessions
    static async getAll() {
        const response = await db.query("SELECT * FROM study_sessions");
        return response.rows.map(row => new StudySession(row));
    }
    // Create a new study session
    static async create(data) {
        const { user_id, duration } = data;
        const response = await db.query("INSERT INTO study_sessions (user_id, duration) VALUES ($1, $2) RETURNING *", [user_id, duration]);
        const newId = response.rows[0].session_id;
        return StudySession.findById(newId);
    }

    // Fetch a study session by its session_id
    static async findById(id) {
        const response = await db.query("SELECT * FROM study_sessions WHERE session_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Study session not found");
        }
        return new StudySession(response.rows[0]);
    }

    // Update a study session's details
    async update() {
        const response = await db.query("UPDATE study_sessions SET user_id = $1, duration = $2 WHERE session_id = $3 RETURNING *", [this.user_id, this.duration, this.session_id]); 
        return new StudySession(response.rows[0]);
    }

    // Delete a study session by its session_id
    async destroy() {
        await db.query("DELETE FROM study_sessions WHERE session_id = $1", [this.session_id]);  
    }
}

module.exports = StudySession;
