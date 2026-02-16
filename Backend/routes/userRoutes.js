import express from 'express'
import { createSignup , createLogin , getUsers, deleteUsers  } from '../controller/userController.js';

const router = express.Router();

router.post('/register' , createSignup);
router.post('/login' , createLogin);
router.get('/users', getUsers);
router.delete('/user/:id' , deleteUsers);


export default router;
