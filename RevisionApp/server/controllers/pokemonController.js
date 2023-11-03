const Pokemon = require('../models/Pokemon')
const Student = require('../models/Student')
const Collection = require('../models/Collection')

async function newBaby(req, res) {
    const token = req.headers["authorization"];
    try {
        const student = await Student.getOneByToken(token);
        const { user_id } = student;
        console.log(user_id)
        if (student.current_poked === null) {
            const studentCollection = await Collection.findByUserId(user_id)
            let newBaby
            if (studentCollection != null) {
                // const babyVersion = studentCollection.map(async(item) => {
                //     // const pokemon = await Pokemon.findById(item.pokemon_id)
                //     item = await Pokemon.findBabyVersion(item.pokemon_id)
                // })
                // console.log(babyVersion)
                let condition = true
                do {
                    newBaby = await Pokemon.getNewBaby()
                    let temp = newBaby
                    do {
                        temp = await temp.checkForEvolution(temp.study_time)
                    } while (temp.evolves_to != null);
                    console.log("temp:")
                    console.log(temp)
                    console.log("collection:")
                    console.log(studentCollection)
                    if (studentCollection.findIndex((poke) => poke.pokemon_id == temp.pokemon_id) == -1) {
                        condition = false
                    }
                } while (condition);
            } else {
                newBaby = await Pokemon.getNewBaby()
            }
            // const newBaby = await Pokemon.getNewBaby()
            await Student.updatePoke(user_id, newBaby.pokemon_id)
            console.log(newBaby)
            res.status(201).json(newBaby)
        } else {
            res.status(200).send({ message: "still have a pokemon to evolve" })
        }
    } catch (error) {
        console.log(error)
        res.status(404).send({ message: error })
    }
}

async function starter(req, res) {
    const token = req.headers["authorization"];
    try {
        const student = await Student.getOneByToken(token);
        const { user_id } = student;
        const poke_id = req.params.id
        const starter = await Pokemon.findById(poke_id)
        await Student.updatePoke(user_id, starter.pokemon_id)
        res.status(201).json(starter)
    } catch (error) {
        console.log(error)
        res.status(404).send({ message: error })
    }
}

async function evolution(req, res) {
    const token = req.headers["authorization"];
    const studyTime = req.body["studyTime"]
    try {
        //evolve
        //if add to collection call addToCollection
        const student = await Student.getOneByToken(token);
        const { user_id, current_poked } = student
        if (current_poked != null) {
            const pokemon = await Pokemon.findById(current_poked)
            const evolvedPokemon = await pokemon.checkForEvolution(studyTime)
            if (evolvedPokemon == "can not evolve") {
                res.status(200).send({ message: "not enough time" })
            }
            await Student.updatePoke(user_id, evolvedPokemon.pokemon_id)
            const finalCheck = await evolvedPokemon.checkForEvolution(studyTime)
            let message = "current pokemon:"
            if (finalCheck == "add to collection") {
                await addToCollection(req, res)
                message = "added to collection:"
            }
            res.status(200).send({ message: message, pokemon: evolvedPokemon })
        } else {
            res.status(200).send({ message: "no pokemon to evolve" })
        }
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
}

async function addToCollection(req, res) {
    const token = req.headers["authorization"];
    try {
        const student = await Student.getOneByToken(token);
        const { user_id, current_poked } = student;
        const pokemon = await Pokemon.findById(current_poked)
        try {
            await Collection.create(pokemon, user_id)
        } catch (error) {
            res.status(200).json({ message: "already in collection :<" })
        }
        await Student.updatePoke(user_id, null)
        // res.status(201).json({message: "added to collection"})
        return
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
}

async function currentPokemon(req, res) {
    const token = req.headers["authorization"];
    try {
        const student = await Student.getOneByToken(token);
        const { current_poked } = student
        const pokemon = await Pokemon.findById(current_poked)
        res.status(200).json(pokemon)
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
}

async function currentCollection(req, res) {
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

async function getAll(req, res) {
    const pokemon = await Pokemon.getAllPokemon()
    res.status(200).send(pokemon)
}

async function getAllBaby(req, res) {
    const babies = await Pokemon.getAllBabyPokemon()
    res.status(200).send(babies)
}

async function getById(req, res) {
    const id = parseInt(req.params.id)
    const pokemon = await Pokemon.findById(id)
    res.status(200).send(pokemon)
}

module.exports = { newBaby, evolution, currentPokemon, currentCollection, getAll, getAllBaby, getById, starter }
