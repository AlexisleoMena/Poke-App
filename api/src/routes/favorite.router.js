const { Router } = require('express');
const { getAllFavorites, addFavorite, deleteFavorite, getRanking } = require('../controllers/favorite.controller');

const router = Router();

router.get('/ranking', getRanking);
router.get('/:email', getAllFavorites);
router.post('/', addFavorite);
router.delete('/:id/:email', deleteFavorite);

module.exports = router;
