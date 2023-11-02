const request = require("supertest");
const app = require("../app");
const StudySession = require("../models/StudySession");

describe("Study Session Routes", () => {
	it("should get all study sessions", async () => {
		const response = await request(app).get("/studysession");
		expect(response.status).toBe(200);
		expect(Array.isArray(response.body)).toBe(true);
	});

	it("should get a single study session by ID", async () => {
		const studySessionData = {
			user_id: 1,
			duration: "01:00:00",
		};

		const studySession = await StudySession.create(studySessionData);

		const response = await request(app).get(`/studysession/${studySession.session_id}`);
		expect(response.status).toBe(200);
		expect(typeof response.body === "object").toBe(true);
	});

	it("should create a new study session", async () => {
		const sessionData = {
			user_id: 1,
			duration: "1:00:00",
		};

		const response = await request(app).post("/studysession").send(sessionData);
		expect(response.status).toBe(201);
		expect(typeof response.body === "object").toBe(true);
	});

	it("should update an existing study session by ID", async () => {
		const studySession = await StudySession.create({
			user_id: 1,
			duration: "01:00:00",
		});

		const updatedData = {
			user_id: 2,
			duration: "02:00:00",
		};

		const response = await request(app).patch(`/studysession/${studySession.session_id}`).send(updatedData);
		expect(response.status).toBe(200);
		expect(typeof response.body === "object").toBe(true);
	});

	it("should delete a study session by ID", async () => {
		const studySession = await StudySession.create({
			user_id: 1,
			duration: "01:00:00",
		});

		const response = await request(app).delete(`/studysession/${studySession.session_id}`);
		expect(response.status).toBe(200);
	});
});
