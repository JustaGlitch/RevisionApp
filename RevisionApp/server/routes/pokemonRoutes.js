const { Router } = require('express');

const pokemonController = require('../controllers/pokemonController')

const pokemonRouter = Router()

pokemonRouter.post('/evolve', pokemonController.evolution)
pokemonRouter.post('/new', pokemonController.newBaby)
pokemonRouter.post('/new/:id', pokemonController.newBaby)
pokemonRouter.get('/current', pokemonController.currentPokemon)
pokemonRouter.get('/collection', pokemonController.currentCollection)
pokemonRouter.get('/', pokemonController.getAll)
pokemonRouter.get('/baby', pokemonController.getAllBaby)
pokemonRouter.get('/:id', pokemonController.getById)

module.exports = pokemonRouter