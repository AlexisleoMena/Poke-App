const { Router } = require('express');
const { getAllTypes } = require('../controllers/type.controller.js');

const router = Router();
router.get('/', getAllTypes);
module.exports = router;

