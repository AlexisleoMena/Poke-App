const { Router } = require('express');
const { createUser, getAllUsers } = require('../controllers/user.controller');

const router = Router();

router.get('/', getAllUsers);
router.post('/:email', createUser);

module.exports = router;