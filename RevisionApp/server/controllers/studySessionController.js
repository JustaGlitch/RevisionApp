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
        const id = parseInt(req.params.session_id);
        const studySession = await StudySession.findById(id);
        res.status(200).json(studySession);
    }catch(error){
        console.log(error);
        res.status(400).json({error: error.message});
    }
}

async function create(req, res){
    try{
        const data = req.body;
        const newStudySession = await StudySession.create(data);
        res.status(201).json(newStudySession);
    }catch(error){
        console.log(error);
        res.status(400).json({error: error.message});
    }
}

async function update(req, res){
    try{
        let id = parseInt(req.params.session_id);
        const existingStudySession = await StudySession.findById(id);

        const dataToUpdate = {
            ...existingStudySession,
            ...req.body
        }

        const studySession = await new StudySession(dataToUpdate);
        const updatedStudySession = await studySession.update();

        res.status(200).json(updatedStudySession);
    }catch(error){
        console.log(error);
        res.status(400).json({error: error.message});
    }
}

async function destroy(req, res){
    try{
        let id = parseInt(req.params.session_id);
        const studySession = await StudySession.findById(id);
        await studySession.destroy();
        res.status(200).json({message: "Study session deleted"});
    }catch(error){
        console.log(error);
        res.status(400).json({error: error.message});
    }
}

module.exports = { index, show, create, update, destroy };