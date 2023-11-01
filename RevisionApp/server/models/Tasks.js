const db = require("../database/connect");

class Task {
    constructor(data) {
        this.task_id = data.task_id;
        this.title = data.title;
        this.description = data.description;
        this.admin_id = data.admin_id;
        this.user_id = data.user_id;
        this.class_id = data.class_id;
        this.completed = data.completed || false; 
        this.suggested_time = data.suggested_time;
        this.taskCreated_at = data.taskCreated_at;
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
        const { title, description, admin_id, user_id, class_id, completed, suggested_time, taskCreated_at } = data;
        const response = await db.query("INSERT INTO tasks (title, description, admin_id, user_id, class_id, completed, suggested_time, taskCreated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", [title, description, admin_id, user_id, class_id, completed, suggested_time, taskCreated_at]);
        const newId = response.rows[0].task_id;
        return Task.getById(newId);
    }

    // Update a task's details
    async update() {
        const response = await db.query("UPDATE tasks SET title = $1, description = $2, admin_id = $3, user_id = $4, class_id = $5, completed = $6, suggested_time = $7, taskCreated_at = $8 WHERE task_id = $9 RETURNING *", [this.title, this.description, this.admin_id, this.user_id, this.class_id, this.completed, this.suggested_time, this.taskCreated_at, this.task_id]);
        return new Task(response.rows[0]);
    }

    // Delete a task by its task_id
    async destroy() {
        await db.query("DELETE FROM tasks WHERE task_id = $1", [this.task_id]);
    }
}

module.exports = Task;
