const bcrypt = require("bcrypt");

const Admin = require("../models/Admin");
const Token = require("../models/Token");

async function register(req, res){
    try{
        const data = req.body;

        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));

        data.password = await bcrypt.hash(data.password, salt);
        const result = await Admin.create(data);

        const token = await Token.create(result.admin_id);
        res.status(201).json({authenticated: true, token: token.token});

    }catch(error){
        console.log(error);
        res.status(400).json({error: error.message});
    }
}

async function login(req, res){
    try{
        const data = req.body;

        const admin = await Admin.getAdminUsername(data.username);

        const authenticated = await bcrypt.compare(data.password, admin.password);

        if(!authenticated){
            throw new Error("Invalid password");
        }

        const token = await Token.create(admin.admin_id);
        res.status(200).json({authenticated: true, token: token.token});

    }catch(error){
        console.log(error);
        res.status(403).json({error: error.message});
    }
}

async function profile (req, res){
    const token = req.headers["authorization"];
    try{
        const admin = await Admin.getOneByToken(token);
        const { username } = admin;
        res.status(200).json({username: username});
    }catch(error){
        console.log(error);
        res.status(403).json({error: error.message});
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

async function create (req, res){
    try{
        const data = req.body;
        const admin = await Admin.getOneByToken(req.headers["authorization"]);
        const newClass = await Class.create(data.class_name, admin.admin_id);
        res.status(201).json(newClass);
    }catch(error){
        console.log(error);
        res.status(400).json({error: error.message});
    }
}

async function update (req, res){
    try{
        const data = req.body;
        const admin = await Admin.getOneByToken(req.headers["authorization"]);
        const classData = await Class.getById(data.class_id);

        // Check if admin is authorized
        if(classData.admin_id !== admin.admin_id){
            throw new Error("Unauthorized");
        }

        const updatedClass = await classData.update(data.class_name);
        res.status(200).json(updatedClass);
    }catch(error){
        console.log(error);
        res.status(400).json({error: error.message});
    }
}

async function destroy (req, res){
    try{
        const data = req.params;
        const admin = await Admin.getOneByToken(req.headers["authorization"]);
        const classData = await Class.getById(data.class_id);

        // Check if admin is authorized
        if(classData.admin_id !== admin.admin_id){
            throw new Error("Unauthorized");
        }

        await classData.destroy();
        res.status(200).json({message: "Class deleted"});
    }catch(error){
        console.log(error);
        res.status(400).json({error: error.message});
    }
}


module.exports = { register, login, profile, index, show, create, update, destroy };