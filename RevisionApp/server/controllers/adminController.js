const bcrypt = require("bcrypt");

const Admin = require("../models/Admin");
const Token = require("../models/Token");

async function register(req, res){
    try{
        const data = req.body;

        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));

        data["password"] = await bcrypt.hash(data["password"], salt);

        const result = await Admin.create(data);
        res.status(201).json(result);

    }catch(error){
        console.log(error);
        res.status(400).json({error: error.message});
    }
}

async function login(req, res){
    try{
        const data = req.body;

        const admin = await Admin.getAdminUsername(data.username);

        const authenticated = await bcrypt.compare(data.password, admin["password"]);

        if(!authenticated){
            throw new Error("Invalid password");
        }else{

        const token = await Token.create(null, admin.admin_id);
        res.status(200).json({authenticated: true, token: token.token});
        }

    }catch(error){
        console.log(error);
        res.status(403).json({error: error.message});
    }
}

async function profile (req, res){
    const token =  req.headers["authorization"]
    try{
        const admin = await Admin.getOneByToken(token);
        const {username, password} = admin;
        res.status(200).json({username, password});
    }catch(error){
        console.log(error);
        res.status(400).json({error: error.message});
    }
}

// get all admins
async function index (req, res){
    try{
        const admin = await Admin.getAll();
        res.status(200).json(admin);
    }catch(error){
        console.log(error);
        res.status(400).json({error: error.message});
    }
}

async function show (req, res){
    try{
        const id = parseInt(req.params.admin_id);
        const admin = await Admin.getAdminId(id);
        res.status(200).json(admin);
    }catch(error){
        console.log(error);
        res.status(400).json({error: error.message});
    }
}

async function create (req, res){
    try{
        const data = req.body;
        const admin = await Admin.create(data);
        res.status(201).json(admin);
    }catch(error){
        console.log(error);
        res.status(400).json({error: error.message});
    }
}

async function update (req, res){
    try{
        let id = parseInt(req.params.admin_id);
        const existingAdmin = await Admin.getAdminId(id);
        
        const dataToUpdate = {
            ...existingAdmin,
            ...req.body
        }
        const admin = await new Admin(dataToUpdate)
        const updatedAdmin = await admin.update();

        res.status(200).json(updatedAdmin);
    }
    catch(error){
        console.log(error);
        res.status(400).json({error: error.message});
    }
}

async function destroy (req, res){
    try{
        let id = parseInt(req.params.admin_id);
        
        // Check if the parsed ID is a valid number
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid admin ID provided" });
        }

        // Create an instance of StudentUser with the correct user_id
        const admin = new Admin({ admin_id: id });

        // Log the value to diagnose any further issues
        console.log("Attempting to delete admin with user_id:", admin.admin_id);

        // Call the destroy method
        await admin.destroy();

        // Respond with success
        res.status(200).json({ message: "admin deleted" });
    }catch(error){
        console.log(error);
        res.status(400).json({error: error.message});
    }
}


module.exports = { register, login, profile, index, show, create, update, destroy };