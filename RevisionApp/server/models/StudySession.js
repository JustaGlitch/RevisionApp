const db = require("../database/connect");

class StudySession {
    constructor(session_id, user_id, duration) {
        this.session_id = session_id;
        this.user_id = user_id;
        this.duration = duration;
        this.tableName = "study_sessions";
    }

    // Create a new study session
    async create() {
        try {
            const result = await db.query(
                `INSERT INTO ${this.tableName} (user_id, duration) VALUES ($1, $2) RETURNING session_id`,
                [this.user_id, this.duration]
            );
            this.session_id = result.rows[0].session_id;
            return this;
        } catch (error) {
            console.error("Error creating study session:", error);
            throw error;
        }
    }

    // Fetch a study session by its session_id
    static async findById(session_id) {
        try {
            const result = await db.query(
                `SELECT * FROM study_sessions WHERE session_id = $1`,
                [session_id]
            );
            if (result.rows.length === 0) return null;
            const sessionData = result.rows[0];
            return new StudySession(sessionData.session_id, sessionData.user_id, sessionData.duration);
        } catch (error) {
            console.error("Error finding study session by ID:", error);
            throw error;
        }
    }

    // Update a study session's details
    async update() {
        try {
            await db.query(
                `UPDATE ${this.tableName} SET user_id = $1, duration = $2 WHERE session_id = $3`,
                [this.user_id, this.duration, this.session_id]
            );
            return this;
        } catch (error) {
            console.error("Error updating study session:", error);
            throw error;
        }
    }

    // Delete a study session by its session_id
    async destroy() {
        try {
            await db.query(
                `DELETE FROM ${this.tableName} WHERE session_id = $1`,
                [this.session_id]
            );
        } catch (error) {
            console.error("Error deleting study session:", error);
            throw error;
        }
    }
}

module.exports = StudySession;
