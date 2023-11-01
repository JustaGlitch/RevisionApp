const db = require("../database/connect");

class Students {
    constructor(data) {
        this.student_id = data.student_id;
        this.user_id = data.user_id;
        this.class_id = data.class_id;
    }

    // Fetch all students
    static async getAll() {
        const response = await db.query(`SELECT * FROM students`);
        return response.rows.map(row => new Students(row));
    }

    // Create a new student
    static async create(data) {
        const { user_id, class_id } = data;
        const response = await db.query("INSERT INTO students (user_id, class_id) VALUES ($1, $2) RETURNING *", [user_id, class_id]);
        const newId = response.rows[0].student_id;
        return Students.findById(newId);
    }

    // Fetch a student by its student_id
    static async findById(id) {
        const response = await db.query(`SELECT * FROM students WHERE student_id = $1`, [id]);
        if (response.rows.length != 1) {
            throw new Error("Student not found");
        }
        return new Students(response.rows[0]);
    }

    // Update the student's user_id and class_id
    async update() {
        const response = await db.query("UPDATE students SET user_id = $1, class_id = $2 WHERE student_id = $3 RETURNING *", [this.user_id, this.class_id, this.student_id]);
        return new Students(response.rows[0]);
    }

    // Delete a student by its student_id
    async destroy() {
        await db.query("DELETE FROM students WHERE student_id = $1", [this.student_id]);
    }
}

module.exports = Students;
