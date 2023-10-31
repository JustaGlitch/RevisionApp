const db = require("../database/connect");

class Student {
    constructor(student_id, user_id, class_id) {
        this.student_id = student_id;
        this.user_id = user_id;
        this.class_id = class_id;
        this.tableName = "students";
    }

    // Create a new student
    async create() {
        try {
            const result = await db.query(
                `INSERT INTO ${this.tableName} (user_id, class_id) VALUES ($1, $2) RETURNING student_id`,
                [this.user_id, this.class_id]
            );
            this.student_id = result.rows[0].student_id;
            return this;
        } catch (error) {
            console.error("Error creating student:", error);
            throw error;
        }
    }

    // Fetch a student by its student_id
    static async findById(student_id) {
        try {
            const result = await db.query(
                `SELECT * FROM ${this.tableName} WHERE student_id = $1`,
                [student_id]
            );
            if (result.rows.length === 0) return null;
            const studentData = result.rows[0];
            return new Student(studentData.student_id, studentData.user_id, studentData.class_id);
        } catch (error) {
            console.error("Error finding student by ID:", error);
            throw error;
        }
    }

    // Update the student's user_id and class_id
    async update() {
        try {
            await db.query(
                `UPDATE ${this.tableName} SET user_id = $1, class_id = $2 WHERE student_id = $3`,
                [this.user_id, this.class_id, this.student_id]
            );
            return this;
        } catch (error) {
            console.error("Error updating student:", error);
            throw error;
        }
    }

    // Delete a student by its student_id
    async destroy() {
        try {
            await db.query(
                `DELETE FROM ${this.tableName} WHERE student_id = $1`,
                [this.student_id]
            );
        } catch (error) {
            console.error("Error deleting student:", error);
            throw error;
        }
    }
}

module.exports = Student;
