const Pokemon = require('../models/Pokemon')
const Student = require('../models/Student')
const Collection = require('../models/Collection')

async function newBaby (req,res) {
    const token = req.headers["authorization"];
    try {
        const student = await Student.getOneByToken(token);
        const { user_id } = student;
        if(student.current_poked == null){
            const studentCollection = await Collection.findByUserId(user_id)
            let newBaby
            if(studentCollection.collection_id != null){
                const babyVersion = studentCollection.map(async(item) => {
                    const pokemon = await Pokemon.findById(item.pokemon_id)
                    return await pokemon.findBabyVersion()
                })
                let condition = true
                do {
                    newBaby = await Pokemon.getNewBaby()
                    if(babyVersion.findIndex((poke) => poke.pokemon_id == newBaby.pokemon_id) == -1){
                        condition = false
                    }
                } while (condition);
            }else{
                newBaby = await Pokemon.getNewBaby()
            }
            await Student.updatePoke(user_id, newBaby.pokemon_id)
            console.log(newBaby)
            res.status(201).json(newBaby)
        }
        res.status(200).send({message: "still have a pokemon to evolve"})
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
}

async function evolution (req,res) {
    const token = req.headers["authorization"];
    const studyTime = req.body["studyTime"]
    try {
        //evolve
        //if add to collection call addToCollection
        const student = await Student.getOneByToken(token);
        const {user_id, current_poked} = student
        const pokemon = await Pokemon.findById(current_poked)
        const evolvedPokemon = await pokemon.checkForEvolution(studyTime)
        console.log(evolvedPokemon)
        if(evolvedPokemon == "add to collection"){
            await addToCollection(req,res)
        }
        await Student.updatePoke(user_id, evolvedPokemon.pokemon_id)
        res.status(200).send(evolvedPokemon)
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
}

async function addToCollection (req,res) {
    const token = req.headers["authorization"];
    try {
        const student = await Student.getOneByToken(token);
        const { user_id, current_poked } = student;
        await Collection.create(current_poked, user_id)
        res.status(201).json({message: "added to collection"})
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
}

async function currentPokemon (req,res) {
    const token = req.headers["authorization"];
    try {
        const student = await Student.getOneByToken(token);
        const {current_poked} = student
        const pokemon = await Pokemon.findById(current_poked)
        res.status(200).json(pokemon)
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
}

async function currentCollection (req, res) {
    const token = req.headers["authorization"];
     try {
        const student = await Student.getOneByToken(token);
        const { user_id } = student;
        const studentCollection = await Collection.findByUserId(user_id)
        res.status(200).send(studentCollection)
     } catch (error) {
        console.log(error)
        res.status(404).send(error)
     }
}

async function getAll (req,res) {
    const pokemon = await Pokemon.getAllPokemon()
    res.status(200).send(pokemon)
}

async function getAllBaby (req,res) {
    const babies = await Pokemon.getAllBabyPokemon()
    res.status(200).send(babies)
}

async function getById (req,res) {
    const id = parseInt(req.params.id)
    const pokemon = await Pokemon.findById(id)
    res.status(200).send(pokemon)
}

module.exports = {newBaby, evolution, currentPokemon, currentCollection, getAll, getAllBaby, getById}