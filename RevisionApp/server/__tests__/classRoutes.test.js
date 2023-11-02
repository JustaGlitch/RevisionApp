const request = require("supertest");
const app = require("../app");
const Class = require("../models/Class");
const db = require("../database/connect");

describe("Class Routes", () => {
	afterEach(async () => {
		// Manually delete data after each test
		await db.query("DELETE FROM class WHERE classname IN ($1, $2, $3)", ["Test Class", "New Class", "Updated Class Name"]);
	});
	it("should get all classes", async () => {
		const response = await request(app).get("/class");
		expect(response.status).toBe(200);
		expect(Array.isArray(response.body)).toBe(true);
	});

	it("should get a single class by ID", async () => {
		const classInstance = await Class.create({
			admin_id: 1,
			classname: "Test Class",
		});

		const response = await request(app).get(`/class/${classInstance.class_id}`);
		expect(response.status).toBe(200);
		expect(typeof response.body === "object").toBe(true);
	});

	it("should create a new class", async () => {
		const classData = {
			admin_id: 1,
			classname: "New Class",
		};

		const response = await request(app).post("/class").send(classData);
		expect(response.status).toBe(201);
		expect(typeof response.body === "object").toBe(true);
	});

	it("should update an existing class by ID", async () => {
		const classInstance = await Class.create({
			admin_id: 1,
			classname: "Test Class",
		});

		const updatedData = {
			admin_id: 2,
			classname: "Updated Class Name",
		};

		const response = await request(app).patch(`/class/${classInstance.class_id}`).send(updatedData);
		expect(response.status).toBe(200);
		expect(typeof response.body === "object").toBe(true);
	});

	it("should delete a class by ID", async () => {
		const classInstance = await Class.create({
			admin_id: 1,
			classname: "testclasss",
		});

		const response = await request(app).delete(`/class/${classInstance.class_id}`);
		expect(response.status).toBe(200);
	});

	it("should get a class by classname", async () => {
		const classInstance = await Class.create({
			admin_id: 1,
			classname: "Test Class",
		});

		const response = await request(app).get(`/class/classname/${classInstance.classname}`);
		expect(response.status).toBe(200);
		expect(typeof response.body === "object").toBe(true);
	});
});
