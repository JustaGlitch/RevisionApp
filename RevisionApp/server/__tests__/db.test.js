const request = require("supertest");
const db = require("../database/connect");
const { Pool } = require("pg");

describe("Database Connection", () => {
	it("should establish a database connection", async () => {
		expect(db).toBeDefined();
		expect(db).toBeInstanceOf(Pool);
	});
});
