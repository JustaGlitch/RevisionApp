const request = require("supertest");
const app = require("../app");
const Admin = require("../models/Admin");
const db = require("../database/connect");

describe("Admin Routes", () => {
	afterEach(async () => {
		// Manually delete data after each test
		await db.query("DELETE FROM admin WHERE username IN ($1, $2, $3, $4)", ["testadmin", "newadmin", "updatedadmin", "testadmin99"]);
	});

	it("should register a new admin user", async () => {
		const adminData = {
			username: "testadmin",
			password: "testpassword",
		};

		const response = await request(app).post("/admin/register").send(adminData);

		expect(response.status).toBe(201);
		expect(typeof response.body === "object").toBe(true);
	});

	it("should log in as an admin user", async () => {
		const adminData = {
			username: "testadmin99",
			password: "testpassword99",
		};

		await Admin.create(adminData); // Create an admin user to log in

		const response = await request(app).post("/admin/login").send(adminData);

		expect(response.status).toBe(200);
		expect(typeof response.body === "object").toBe(true);
	});

	it("should get the profile of an admin user", async () => {
		const adminData = {
			username: "testadmin",
			password: "testpassword",
		};

		const admin = await Admin.create(adminData);

		const response = await request(app).get("/admin/profile").set("Authorization", "your_auth_token_here"); // Replace with a valid auth token

		expect(response.status).toBe(200);
		expect(typeof response.body === "object").toBe(true);
	});

	it("should get all admin users", async () => {
		const response = await request(app).get("/admin");
		expect(response.status).toBe(200);
		expect(Array.isArray(response.body)).toBe(true);
	});

	it("should get a single admin user by ID", async () => {
		const adminData = {
			username: "testadmin",
			password: "testpassword",
		};

		const admin = await Admin.create(adminData);

		const response = await request(app).get(`/admin/${admin.admin_id}`);
		expect(response.status).toBe(200);
		expect(typeof response.body === "object").toBe(true);
	});

	it("should create a new admin user", async () => {
		const adminData = {
			username: "newadmin",
			password: "newpassword",
		};

		const response = await request(app).post("/admin").send(adminData);

		expect(response.status).toBe(201);
		expect(typeof response.body === "object").toBe(true);
	});

	it("should update an existing admin user by ID", async () => {
		const adminData = {
			username: "testadmin",
			password: "testpassword",
		};

		const admin = await Admin.create(adminData);

		const updatedData = {
			username: "updatedadmin",
			password: "updatedpassword",
		};

		const response = await request(app).patch(`/admin/${admin.admin_id}`).send(updatedData);

		expect(response.status).toBe(200);
		expect(typeof response.body === "object").toBe(true);
	});

	it("should delete an admin user by ID", async () => {
		const adminData = {
			username: "testadmindelete",
			password: "testpassword",
		};

		const admin = await Admin.create(adminData);

		const response = await request(app).delete(`/admin/${admin.admin_id}`);
		expect(response.status).toBe(200);
	});
});
