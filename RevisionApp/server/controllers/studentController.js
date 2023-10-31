const bcrypt = require("bcrypt");

const StudentUser = require("../models/Student");
const Token = require("../models/Token");

async function register(req, res){
    try{
        const data = req.body;

        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));

        data["password"] = await bcrypt.hash(data["password"], salt);

        const result = await StudentUser.create(data);
        res.status(201).json(result);

    }catch(error){
        console.log(error);
        res.status(400).json({error: error.message});
    }
}

async function login(req, res){
    try{
        const data = req.body;

        const student = await Student.getUserUsername(data.username);

        const authenticated = await bcrypt.compare(data.password, student["password"]);

        if(!authenticated){
            throw new Error("Invalid password");
        }else{

        const token = await Token.create(student.user_id);
        res.status(200).json({authenticated: true, token: token.token});
        }

    }catch(error){
        console.log(error);
        res.status(403).json({error: error.message});
    }
}

async function profile (req, res){
    try{
        const student = await StudentUser.getOneByToken(req.headers["authorization"]);
        res.status(200).json(student);
    }catch(error){
        console.log(error);
        res.status(400).json({error: error.message});
    }
}

async function poke (req, res){
    const token = req.headers["authorization"];
    try{
        const student = await StudentUser.getOneByToken(token);
        const updatedStudent = await StudentUser.updatePoke(student.user_id);
        res.status(200).json(updatedStudent);
    }catch(error){
        console.log(error);
        res.status(400).json({error: error.message});
    }
}

// index using get all
async function index (req, res){
    try{
        const student = await StudentUser.getAll();
        res.status(200).json(student);
    }catch(error){
        console.log(error);
        res.status(400).json({error: error.message});
    }
}


async function show (req, res){
    try{
        const id = parseInt(req.params.student_id);
        const user = await StudentUser.getUserId(id);
        res.status(200).json(user);
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
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
}

async function update(req, res) {
    try {
        let id = parseInt(req.params.student_id);
        const existingStudent = await StudentUser.getUserId(id);

        const dataToUpdate = {
            ...existingStudent,
            ...req.body
        }
        const student = await new StudentUser(dataToUpdate)
        const updatedStudent = await student.update();

        res.status(200).json(updatedStudent);
    }catch(error){
        console.log(error);
        res.status(400).json({error: error.message});
    }
}

async function destroy(req, res) {
    try {
        let id = parseInt(req.params.student_id);
        const student = await StudentUser.getUserId(id);
        await student.destroy();
        res.status(204).end();
    }catch(error){
        console.log(error);
        res.status(400).json({error: error.message});
    }
}



module.exports = { register, login, profile, poke, index, show, create, update, destroy };