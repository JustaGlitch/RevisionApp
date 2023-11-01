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
        const id = parseInt(req.params.student_id);
        const student = await Students.findById(id);
        res.status(200).json(student);
    }catch(error){
        console.log(error);
        res.status(400).json({error: error.message});
    }
}

async function create(req, res){
    try{
        const data = req.body;
        const newStudent = await Students.create(data);
        res.status(201).json(newStudent);
    }catch(error){
        console.log(error);
        res.status(400).json({error: error.message});
    }
}

async function update(req, res){
    try{
        let id = parseInt(req.params.student_id);
        const existingStudent = await Students.findById(id);

        const dataToUpdate = {
            ...existingStudent,
            ...req.body
        }
        const student = await new Students(dataToUpdate)
        const updatedStudent = await student.update();

        res.status(200).json(updatedStudent);
    }catch(error){
        console.log(error);
        res.status(400).json({error: error.message});
    }
}

async function destroy(req, res){
    try{
        let id = parseInt(req.params.student_id);
        const student = await Students.findById(id);
        await student.destroy();
        res.status(200).json({message: "Student deleted"});
    }catch(error){
        console.log(error);
        res.status(400).json({error: error.message});
    }
}

module.exports = { index, show, create, update, destroy }