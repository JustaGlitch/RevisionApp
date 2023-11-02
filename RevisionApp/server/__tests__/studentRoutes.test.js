const request = require("supertest");
const app = require("../app");
const StudentUser = require("../models/Student");
const db = require("../database/connect");

describe("Student Routes", () => {
	afterEach(async () => {
		// Manually delete data after each test
		await db.query("DELETE FROM student_user WHERE username IN ($1, $2, $3)", ["gg123", "testuser", "test99"]);
	});
	it("should register a new student user", async () => {
		const userData = await StudentUser.create({
			username: "gg123",
			password: "gg123",
		});

		const response = await request(app).post("/student/register/").send(userData);

		expect(response.status).toBe(201);
		expect(typeof response.body === "object").toBe(true);
	});

	it("should log in a student user", async () => {
		const userData = {
			username: "testuser",
			password: "testpassword",
		};

		const response = await request(app).post("/student/login").send(userData);

		expect(response.status).toBe(200);
		expect(typeof response.body === "object").toBe(true);
	});

	it("should get the student user profile", async () => {
		// Assuming you have a valid user ID from a previously registered user
		const userId = 1; // Replace with a valid user ID

		const response = await request(app).get(`/student/profile/${userId}`);

		expect(response.status).toBe(200);
		expect(typeof response.body === "object").toBe(true);
	});

	it("should poke a student user", async () => {
		// Assuming you have a valid user ID from a previously registered user
		const userId = 1; // Replace with a valid user ID

		const response = await request(app).post(`/student/poke?user_id=${userId}`);

		expect(response.status).toBe(200);
		expect(typeof response.body === "object").toBe(true);
	});

	it("should get all student users", async () => {
		const response = await request(app).get("/student");

		expect(response.status).toBe(200);
		expect(Array.isArray(response.body)).toBe(true);
	});

	it("should get a single student user by ID", async () => {
		const userId = 2;

		const response = await request(app).get(`/student/?userid=${userId}`);

		expect(response.status).toBe(200);
		expect(typeof response.body === "object").toBe(true);
	});

	it("should update a student user by ID", async () => {
		const studentInstance = {
			username: "test99",
			password: "test99",
			userId: 1,
		};

		const updatedUserData = {
			username: "updateduser",
			password: "updatedpassword",
		};

		const response = await request(app).patch(`/student/${studentInstance.userId}`).send(updatedUserData);

		expect(response.status).toBe(200);
		expect(typeof response.body === "object").toBe(true);
	});

	it("should delete a student user by ID", async () => {
		// Assuming you have a valid user ID from a previously registered user
		const userId = 25; // Replace with a valid user ID

		const response = await request(app).delete(`/student/${userId}`);

		expect(response.status).toBe(200);
	});
});
