const request = require("supertest");
const app = require("../app");
const Task = require("../models/Tasks");

describe("Tasks Routes", () => {
	it("should get all tasks", async () => {
		const response = await request(app).get("/tasks");
		expect(response.status).toBe(200);
		expect(Array.isArray(response.body)).toBe(true);
	});

	it("should get a single task by ID", async () => {
		const task = await Task.create({ title: "Test Task", description: "Test Description" });

		const response = await request(app).get(`/tasks/${task.task_id}`);
		expect(response.status).toBe(200);
		expect(typeof response.body === "object").toBe(true);
	});

	it("should create a new task", async () => {
		const taskData = {
			title: "New Task",
			description: "New Task Description",
		};

		const response = await request(app).post("/tasks").send(taskData);
		expect(response.status).toBe(201);
		expect(typeof response.body === "object").toBe(true);
	});

	it("should update an existing task by ID", async () => {
		const task = await Task.create({ title: "Test Task", description: "Test Description" });

		const updatedData = {
			title: "Updated Task Title",
			description: "Updated Task Description",
		};

		const response = await request(app).patch(`/tasks/${task.task_id}`).send(updatedData);
		expect(response.status).toBe(200);
		expect(typeof response.body === "object").toBe(true);
	});

	it("should delete a task by ID", async () => {
		const task = await Task.create({ title: "Test Task", description: "Test Description" });

		const response = await request(app).delete(`/tasks/${task.task_id}`);
		expect(response.status).toBe(204);
	});
});
