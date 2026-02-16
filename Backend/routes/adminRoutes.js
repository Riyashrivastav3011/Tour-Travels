import express from 'express'
import { adminSignup , adminLogin } from '../controller/adminController.js'
import JWT from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const SECRET = process.env.JWT_SECRET
const verifyToken = (req , res , next) => {
  const token = req.cookies('token');
  JWT.verify(token ,SECRET , (error , decoded)=>{
    if(error){
        return res.send({
            message:'invalid token',
            success:false
        })
    }
    next();
  } )
}


const router  = express.Router();
router.post('/signup' , adminSignup);
router.post('/login' ,  adminLogin);

export default router;