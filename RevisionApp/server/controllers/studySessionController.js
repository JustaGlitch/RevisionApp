const StudySession = require("../models/StudySession");

async function index(req, res){
    try{
        const studySessions = await StudySession.getAll();
        res.status(200).json(studySessions);
    }catch(error){
        console.log(error);
        res.status(400).json({error: error.message});
    }
}

async function show(req, res){
    try{
        const data = req.params;
        const studySession = await StudySession.findById(data.session_id);
        res.status(200).json(studySession);
    }
    catch(error){
        console.log(error);
        res.status(400).json({error: error.message});
    }
}

async function create(req, res){
    try{
        const data = req.body;
        const newStudySession = await StudySession.create(data.user_id, data.duration);
        res.status(201).json(newStudySession);
    }catch(error){
        console.log(error);
        res.status(400).json({error: error.message});
    }
}

async function update(req, res){
    try{
        const data = req.body;
        const studySession = await StudySession.findById(data.session_id);
        const updatedStudySession = await studySession.update(data.user_id, data.duration);
        res.status(200).json(updatedStudySession);
    }
    catch(error){
        console.log(error);
        res.status(400).json({error: error.message});
    }
}

async function destroy(req, res){
    try{
        const data = req.params;
        const studySession = await StudySession.findById(data.session_id);
        await studySession.destroy();
        res.status(200).json({message: "Study session deleted"});
    }
    catch(error){
        console.log(error);
        res.status(400).json({error: error.message});
    }
}

module.exports = { index, show, create, update, destroy };