const Task = require("../models/Tasks");

async function index(req, res) {
    try {
        const tasks = await Task.getAll();
        res.status(200).json(tasks);
    }catch(error){
        console.log(error);
        res.status(400).json({error: error.message});
    }
}

async function show(req, res) {
    try {
        const id = parseInt(req.params.task_id);
        const task = await Task.getById(id);
        res.status(200).json(task);
    }catch(error){
        console.log(error);
        res.status(400).json({error: error.message});
    }
}

async function create(req, res) {
    try {
        const data = req.body;
        const newTask = await Task.create(data);
        res.status(201).json(newTask);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
}

async function update(req, res) {
    try {
        let id = parseInt(req.params.task_id);
        const existingTask = await Task.getById(id);

        const dataToUpdate = {
            ...existingTask,
            ...req.body
        }
        const task = await new Task(dataToUpdate)
        const updatedTask = await task.update();

        res.status(200).json(updatedTask);
    }catch(error){
        console.log(error);
        res.status(400).json({error: error.message});
    }
}

async function destroy(req, res) {
    try {
        let id = parseInt(req.params.task_id);
        const task = await Task.getById(id);
        await task.destroy();
        res.status(204).json({message: "Task deleted"});
    }catch(error){
        console.log(error);
        res.status(400).json({error: error.message});
    }
}

module.exports = { index, show, create, update, destroy };
