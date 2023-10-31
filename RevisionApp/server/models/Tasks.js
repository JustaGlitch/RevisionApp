const db = require("../database/connect");

class Task {
    constructor(task_id, title, description, admin_id, user_id, completed, suggested_time) {
        this.task_id = task_id;
        this.title = title;
        this.description = description;
        this.admin_id = admin_id;
        this.user_id = user_id;
        this.completed = completed || false; 
        this.suggested_time = suggested_time;
        this.tableName = "tasks";
    }

    // Create a new task
    async create() {
        try {
            const result = await db.query(
                `INSERT INTO ${this.tableName} (title, description, admin_id, user_id, completed, suggested_time) VALUES ($1, $2, $3, $4, $5, $6) RETURNING task_id`,
                [this.title, this.description, this.admin_id, this.user_id, this.completed, this.suggested_time]
            );
            this.task_id = result.rows[0].task_id;
            return this;
        } catch (error) {
            console.error("Error creating task:", error);
            throw error;
        }
    }

    // Fetch a task by its task_id
    static async findById(task_id) {
        try {
            const result = await db.query(
                `SELECT * FROM tasks WHERE task_id = $1`,
                [task_id]
            );
            if (result.rows.length === 0) return null;
            const taskData = result.rows[0];
            return new Task(taskData.task_id, taskData.title, taskData.description, taskData.admin_id, taskData.user_id, taskData.completed, taskData.suggested_time);
        } catch (error) {
            console.error("Error finding task by ID:", error);
            throw error;
        }
    }

    // Update a task's details
    async update() {
        try {
            await db.query(
                `UPDATE ${this.tableName} SET title = $1, description = $2, admin_id = $3, user_id = $4, completed = $5, suggested_time = $6 WHERE task_id = $7`,
                [this.title, this.description, this.admin_id, this.user_id, this.completed, this.suggested_time, this.task_id]
            );
            return this;
        } catch (error) {
            console.error("Error updating task:", error);
            throw error;
        }
    }

    // Delete a task by its task_id
    async destroy() {
        try {
            await db.query(
                `DELETE FROM ${this.tableName} WHERE task_id = $1`,
                [this.task_id]
            );
        } catch (error) {
            console.error("Error deleting task:", error);
            throw error;
        }
    }
}

module.exports = Task;
