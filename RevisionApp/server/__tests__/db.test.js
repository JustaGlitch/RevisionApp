const { Pool } = require("pg");
const db = require("../database/connect");

describe("Database Connection", () => {
	it("should create a database connection pool", () => {
		expect(db).toBeInstanceOf(Pool);
	});

	it("should connect to the database", async () => {
		const client = await db.connect();
		expect(client).toBeDefined();
		client.release();
	});
});
