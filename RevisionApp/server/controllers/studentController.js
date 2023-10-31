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

        const student = await Student.getUserUsername(data.username);

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

async function profile (req, res){
    const token = req.headers["authorization"];
    try{
        const student = await StudentUser.getOneByToken(token);
        const { username, current_poked} = student;
        res.status(200).json({username: username, current_poked: current_poked});
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
        const student = await StudentUser.getStudentId(req.params.student_id);
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
        const student = await StudentUser.getStudentId(data.student_id);
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
        const student = await StudentUser.getStudentId(data.student_id);
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
        const student = await StudentUser.getStudentId(data.student_id);
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
        const student = await StudentUser.getStudentId(data.student_id);
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



module.exports = { register, login, profile, poke, index, show, create, update, destroy };