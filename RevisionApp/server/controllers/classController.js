const Class = require("../models/Class");

async function index(req, res) {
    try {
        const classes = await Class.getAll();
        res.status(200).json(classes);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
}

async function show(req, res) {
    try {
        const id = parseInt(req.params.class_id);
        const classes = await Class.getById(id);
        res.status(200).json(classes);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
}

async function create(req, res) {
    try {
        const data = req.body;
        const classes = await Class.create(data);
        res.status(201).json(classes);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
}

async function update(req, res) {
    try {
        let id = parseInt(req.params.class_id);
        const existingClass = await Class.getById(id);

        const dataToUpdate = {
            ...existingClass,
            ...req.body
        }
        const classes = await new Class(dataToUpdate)
        const updatedClass = await classes.update();

        res.status(200).json(updatedClass);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
}

async function destroy(req, res) {
    try {
        let id = parseInt(req.params.class_id);
        const existingClass = await Class.getById(id);

        const classes = await new Class(existingClass)
        await classes.destroy();

        res.status(200).json({ message: "Class deleted" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
}

module.exports = { create, index, show, update, destroy };