import express from 'express'
import { adminSignup , adminLogin , adminLogout} from '../controller/adminController.js'
import {verifyAdmin }from '../middlewares/verifyToken.js'


const router  = express.Router();
router.post('/signup' , adminSignup);
router.post('/login' , adminLogin);
router.post('/logout' , adminLogout);

export default router;