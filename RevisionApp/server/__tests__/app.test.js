const request = require("supertest");
const app = require("../app");

describe("GET /", () => {
	it("should return a welcome message", async () => {
		const response = await request(app).get("/");
		expect(response.status).toBe(200);
		expect(response.text).toBe("this is the StudyDex API");
	});
});
