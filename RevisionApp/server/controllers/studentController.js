const bcrypt = require("bcrypt");

const StudentUser = require("../models/Student");
const Token = require("../models/Token");

async function register(req, res){
    try{
        const data = req.body;

        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));

        data.password = await bcrypt.hash(data.password, salt);
        const result = await StudentUser.create(data);

        const token = await Token.create(result.user_id);
        res.status(201).json({authenticated: true, token: token.token});

    }catch(error){
        console.log(error);
        res.status(400).json({error: error.message});
    }
}

async function login(req, res){
    try{
        const data = req.body;

        const student = await StudentUser.getUserUsername(data.username);

        const authenticated = await bcrypt.compare(data.password, student.password);

        if(!authenticated){
            throw new Error("Invalid password");
        }

        const token = await Token.create(student.user_id);
        res.status(200).json({authenticated: true, token: token.token});

    }catch(error){
        console.log(error);
        res.status(403).json({error: error.message});
    }
}

async function profile(req, res){
    const token = req.headers["authorization"];
    try{
        const student = await StudentUser.getOneByToken(token);
        res.status(200).json({username: student.username, classname: student.classname});
    }catch(error){
        console.log(error);
        res.status(403).json({error: error.message});
    }
}

async function poke (req, res){
    const token = req.headers["authorization"];
    try{
        const student = await StudentUser.getOneByToken(token);
        const { user_id } = student;
        await StudentUser.updatePoke(user_id);
        res.status(200).json({message: "Pokemon"});
    }catch(error){
        console.log(error);
        res.status(403).json({error: error.message});
    }
}

async function index(req, res) {
    try {
        const student = await StudentUser.getAll();
        res.status(200).json(student);
    }catch(error){
        console.log(error);
        res.status(400).json({error: error.message});
    }
}

async function show(req, res) {
    try {
        const id = parseInt(req.params.user_id);
        const student = await StudentUser.getStudentId(id);
        const class_id = await Students.findById(user_id)
        student.class_id = class_id
        res.status(200).json(student);
    }catch(error){
        console.log(error);
        res.status(400).json({error: error.message});
    }
}

async function create(req, res) {
    try {
        const data = req.body;
        const student = await StudentUser.create(data);
        res.status(201).json(student);
    }catch(error){
        console.log(error);
        res.status(400).json({error: error.message});
    }
}

async function update(req, res) {
    try {
        let id = parseInt(req.params.user_id);
        const existingStudent = await StudentUser.getStudentId(id);

        const dataToUpdate = {
            ...existingStudent,
            ...req.body
        }
        const student = new StudentUser(dataToUpdate);
        const updatedStudent = await student.update();

        res.status(200).json(updatedStudent);

    }catch(error){
        console.log(error);
        res.status(400).json({error: error.message});
    }
}

async function destroy(req, res) {
    try {
        let id = parseInt(req.params.user_id);
        
        // Check if the parsed ID is a valid number
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid student ID provided" });
        }

        // Create an instance of StudentUser with the correct user_id
        const student = new StudentUser({ user_id: id });

        // Log the value to diagnose any further issues
        console.log("Attempting to delete student with user_id:", student.user_id);

        // Call the destroy method
        await student.destroy();

        // Respond with success
        res.status(200).json({ message: "Student deleted" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
}





module.exports = { register, login, profile, poke, index, show, create, update, destroy };