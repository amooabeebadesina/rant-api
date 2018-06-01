import express from 'express';
import UserController from '../controllers/user.controller';

const router = express.Router();

router.get('/users', UserController.getUsers);
router.post('/users/create', UserController.createUser);


module.exports = router;