import express from 'express'
import { createSignup , createLogin , getUsers, deleteUsers , getUserProfile  , userLogout} from '../controller/userController.js';
import { verifyUser } from '../middlewares/verifyToken.js';

const router = express.Router();

router.post('/register' , createSignup);
router.post('/login' , createLogin);
router.get('/users', getUsers);
router.delete('/user/:id' , deleteUsers);
router.get('/profile' , verifyUser ,  getUserProfile);
router.post('/logout' , userLogout);


export default router;
