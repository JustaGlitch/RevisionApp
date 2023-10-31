const Class = require("../models/Class");
const Admin = require("../models/Admin");

async function createClass(req, res) {
    try {
        const admin = await Admin.getOneByToken(req.headers["authorization"]);
        const newClass = await Class.create(admin.admin_id);
        res.status(201).json(newClass);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
}

async function getClass(req, res) {
    try {
        const data = req.params;
        const admin = await Admin.getOneByToken(req.headers["authorization"]);
        const classData = await Class.getById(data.class_id);

        // Check if admin is authorized
        if (classData.admin_id !== admin.admin_id) {
            throw new Error("Unauthorized");
        }

        res.status(200).json(classData);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
}

// update class using update method by passing in admin_id by the class_id
async function updateClass(req, res) {
    try {
        const data = req.body;
        const admin = await Admin.getOneByToken(req.headers["authorization"]);
        const classData = await Class.getById(data.class_id);

        // Check if admin is authorized
        if (classData.admin_id !== admin.admin_id) {
            throw new Error("Unauthorized");
        }

        const updatedClass = await classData.updateAdmin(data.admin_id);
        res.status(200).json(updatedClass);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
}

// delete class using destroy method
async function destroyClass(req, res) {
    try {
        const data = req.params;
        const admin = await Admin.getOneByToken(req.headers["authorization"]);
        const classData = await Class.getById(data.class_id);

        // Check if admin is authorized
        if (classData.admin_id !== admin.admin_id) {
            throw new Error("Unauthorized");
        }

        await classData.destroy();
        res.status(200).json({ message: "Class deleted" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
}

async function index (req, res){
    try{
        const admin = await Admin.getOneByToken(req.headers["authorization"]);
        const classes = await Class.getAll(admin.admin_id);
        res.status(200).json(classes);
    }catch(error){
        console.log(error);
        res.status(400).json({error: error.message});
    }
}

async function show (req, res){
    try{
        const data = req.params;
        const admin = await Admin.getOneByToken(req.headers["authorization"]);
        const classData = await Class.getById(data.class_id);

        // Check if admin is authorized
        if(classData.admin_id !== admin.admin_id){
            throw new Error("Unauthorized");
        }

        res.status(200).json(classData);
    }catch(error){
        console.log(error);
        res.status(400).json({error: error.message});
    }
}


module.exports = { createClass, getClass, updateClass, destroyClass, index, show };