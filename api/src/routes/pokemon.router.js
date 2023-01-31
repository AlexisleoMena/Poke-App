const { Router } = require('express');
const { getAllPokemons, getPokemonById } = require('../controllers/pokemon.controller');

const router = Router();

router.get('/', getAllPokemons);
router.get('/:id', getPokemonById);

module.exports = router;