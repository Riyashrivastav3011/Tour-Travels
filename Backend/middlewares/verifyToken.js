import dotenv from 'dotenv'
import JWT from 'jsonwebtoken'
import express from 'express'

dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET

// for User
export const verifyUser = (req , res , next) =>{
    const token = req.cookies.token;
    JWT.verify(token , JWT_SECRET , (error , decoded) =>{
        if(error){
            return res.send(({
                msg:'invalid token',
                success:false
            }))
        }
        req.user = decoded;
        next();
    })
}

// for admin
export const verifyAdmin = (req , res , next) => {
      const token = res.cookie.adminToken;
      JWT.veryfy(token , JWT_SECRET , (error , decoded)=>{
        if(error){
            return res.send({
                masg:"invalid Token",
                success:false
            })
        }
        if(decoded.role !== "admin"){
            return res.status(403).json({ msg: "Access denied", success: false });
        }
        req.admin = decoded;
        next;
      }) ;    
};
