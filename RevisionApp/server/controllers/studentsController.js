const Students = require('../models/Students');

async function index(req, res){
    try{
        const students = await Students.getAll();
        res.status(200).json(students);
    }catch(error){
        console.log(error);
        res.status(400).json({error: error.message});
    }
}

async function show(req, res){
    try{
        const data = req.params;
        const student = await Students.findById(data.student_id);
        res.status(200).json(student);
    }
    catch(error){
        console.log(error);
        res.status(400).json({error: error.message});
    }
}

async function create(req, res){
    try{
        const data = req.body;
        const newStudent = await Students.create(data.student_name, data.student_email, data.student_password);
        res.status(201).json(newStudent);
    }catch(error){
        console.log(error);
        res.status(400).json({error: error.message});
    }
}

async function update(req, res){
    try{
        const data = req.body;
        const student = await Students.findById(data.student_id);
        const updatedStudent = await student.update(data.student_name, data.student_email, data.student_password);
        res.status(200).json(updatedStudent);
    }
    catch(error){
        console.log(error);
        res.status(400).json({error: error.message});
    }
}

async function destroy(req, res){
    try{
        const data = req.params;
        const student = await Students.findById(data.student_id);
        await student.destroy();
        res.status(200).json({message: "Student deleted"});
    }
    catch(error){
        console.log(error);
        res.status(400).json({error: error.message});
    }
}

module.exports = { index, show, create, update, destroy }