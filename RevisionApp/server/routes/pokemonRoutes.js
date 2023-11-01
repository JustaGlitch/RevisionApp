const { Router } = require('express');

const pokemonController = require('../controllers/pokemonController')

const pokemonRouter = Router()

pokemonRouter.post('/evolve', pokemonController.evolution)
pokemonRouter.post('/new', pokemonController.newBaby)
pokemonRouter.get('/current', pokemonController.currentPokemon)
pokemonRouter.get('/collection', pokemonController.currentCollection)
pokemonRouter.get('/', pokemonController.getAll)
pokemonRouter.get('/baby', )
pokemonRouter.get('/:id', )

module.exports = pokemonRouter