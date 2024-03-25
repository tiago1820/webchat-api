const { Router } = require("express");
const authenticate = require('../middleware/authenticate');
const { findCurrentUser, searchUser, editUser, deleteUser } = require('../controllers/user.controller');
const { findById } = require('../models/user.model');

const router = Router();
router.get('/profile', authenticate, findCurrentUser);
router.get('/:userId', authenticate, findById);

router.get('/', authenticate, searchUser);
router.put('/:{id}', authenticate, editUser);
router.delete('/:{userId}', authenticate, deleteUser);


module.exports = router;