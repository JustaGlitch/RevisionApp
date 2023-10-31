const Task = require("../models/Tasks");
const Admin = require("../models/Admin");
const Student = require("../models/Student");

async function index(req, res) {
    try {
        const student = await Student.getStudentId(req.params.student_id);
        const tasks = await Task.getAll(student.student_id);
        res.status(200).json(tasks);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
}

async function show(req, res) {
    try {
        const data = req.params;
        const student = await Student.getStudentId(data.student_id);
        const task = await Task.getById(data.task_id);

        // Check if student is authorized
        if (task.student_id !== student.student_id) {
            throw new Error("Unauthorized");
        }

        res.status(200).json(task);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
}

async function create(req, res) {
    try {
        const data = req.body;
        const student = await Student.getStudentId(data.student_id);
        const newTask = await Task.create(data.task_name, student.student_id);
        res.status(201).json(newTask);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
}

async function update(req, res) {
    try {
        const data = req.body;
        const student = await Student.getStudentId(data.student_id);
        const task = await Task.getById(data.task_id);

        // Check if student is authorized
        if (task.student_id !== student.student_id) {
            throw new Error("Unauthorized");
        }

        const updatedTask = await task.update(data.task_name);
        res.status(200).json(updatedTask);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
}

async function destroy(req, res) {
    try {
        const data = req.params;
        const student = await Student.getStudentId(data.student_id);
        const task = await Task.getById(data.task_id);

        // Check if student is authorized
        if (task.student_id !== student.student_id) {
            throw new Error("Unauthorized");
        }

        await task.destroy();
        res.status(200).json({ message: "Task deleted" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
}

module.exports = { index, show, create, update, destroy };
