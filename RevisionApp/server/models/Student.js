const db = require("../database/connect");

class StudentUser {
	constructor(data) {
		this.user_id = data.user_id;
		this.username = data.username;
		this.password = data.password;
		this.classname = data.classname;
		this.current_poked = data.current_poked;
	}

	static async getStudentId(id) {
		const response = await db.query("SELECT * FROM student_user WHERE user_id = $1", [id]);
		if (response.rows.length != 1) {
			throw new Error("Student not found");
		}
		return new StudentUser(response.rows[0]);
	}

	static async getUserUsername(username) {
		const response = await db.query("SELECT * FROM student_user WHERE username = $1", [username]);
		if (response.rows.length != 1) {
			throw new Error("Student not found");
		}
		return new StudentUser(response.rows[0]);
	}

	// You might need to join with the token table or modify your schema for this method to work
	static async getOneByToken(token) {
		const response = await db.query("SELECT * FROM student_user as s JOIN token as t on t.user_id = s.user_id WHERE token LIKE $1", [token]);
		if (response.rows.length != 1) {
			throw new Error("Student not found");
		}
		return new StudentUser(response.rows[0]);
	}
	// static async getOneByToken(token) {
	//     const response = await db.query("SELECT * FROM student_user as s JOIN token as t on t.user_id = s.user_id WHERE token LIKE token = $1", [token]);
	//     if (response.rows.length != 1) {
	//         throw new Error("Student not found");
	//     }
	//     const student = await StudentUser.getStudentId(response.rows[0].user_id);
	//     return student;
	// }

	static async getAll() {
		const response = await db.query("SELECT * FROM student_user");
		return response.rows.map((row) => new StudentUser(row));
	}

	static async create(data) {
		const { username, password, classname } = data;
		const response = await db.query("INSERT INTO student_user (username, password, classname) VALUES ($1, $2, $3) RETURNING *", [username, password, classname]);
		return new StudentUser(response.rows[0]);
	}

	static async updatePoke(user_id, pokemon_id) {
		const response = await db.query("UPDATE student_user SET current_poked = $1 WHERE user_id = $2 RETURNING *", [pokemon_id, user_id]);
		return new StudentUser(response.rows[0]);
	}

	async update() {
		const response = await db.query("UPDATE student_user SET username = $1, password = $2, classname = $3 WHERE user_id = $4 RETURNING *", [this.username, this.password, this.classname, this.user_id]);
		return new StudentUser(response.rows[0]);
	}

	async destroy() {
		await db.query("DELETE FROM students WHERE user_id = $1", [this.user_id]);
	}
}

module.exports = StudentUser;
