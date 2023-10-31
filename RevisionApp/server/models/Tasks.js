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
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM tasks");
        return response.rows.map(row => new Task(row));
    }

    // Fetch a task by its task_id
    static async getById(id) {
        const response = await db.query("SELECT * FROM tasks WHERE task_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Task not found");
        }
        return new Task(response.rows[0]);
    }

    // Create a new task
    static async create(data) {
        const { title, description, admin_id, user_id, completed, suggested_time } = data;
        const response = await db.query("INSERT INTO tasks (title, description, admin_id, user_id, completed, suggested_time) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [title, description, admin_id, user_id, completed, suggested_time]);
        const newId = response.rows[0].task_id;
        return Task.getById(newId);
    }

    // Update a task's details
    async update() {
        const response = await db.query("UPDATE tasks SET title = $1, description = $2, admin_id = $3, user_id = $4, completed = $5, suggested_time = $6 WHERE task_id = $7 RETURNING *", [this.title, this.description, this.admin_id, this.user_id, this.completed, this.suggested_time, this.task_id]);
        return new Task(response.rows[0]);
    }

    // Delete a task by its task_id
    async destroy() {
        await db.query("DELETE FROM tasks WHERE task_id = $1", [this.task_id]);
    }
}

module.exports = Task;
