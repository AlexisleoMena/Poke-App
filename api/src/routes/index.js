const { Router } = require('express');
const typeRouter = require("./type.router.js");
const pokemonRouter = require("./pokemon.router.js");
const favoriteRouter = require("./favorite.router.js");
const userRouter = require("./user.router.js");

const router = Router();
router.use( "/types", typeRouter );
router.use( "/pokemons", pokemonRouter );
router.use( "/favorite", favoriteRouter );
router.use( "/user", userRouter );
module.exports = router;
