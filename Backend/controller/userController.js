import User from '../models/user.js'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


dotenv.config();

// create users
export const createSignup = async (req , res)=> {
  try{
    const{name ,email, mobile, address , password} = req.body;
    const exist = await User.findOne({email})
    if(exist){
        return res.status(400).json({message:"Email is already registered"})
    }
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password , salt);
    const user = new User({name , email , mobile , address, password:hashed})
    await user.save();
    res.status(200).json({message:"user created successfullly"})
  }
  catch(error){
    res.status(500).json({message:'server error'})
    console.log(error);
  }
}


// get users 
export const getUsers = async (req , res) => {
  try{
    const users = await User.find();
    res.status(200).json({message:'users list' , users:users} );
  }catch(err){
    res.status(400).json({message: "error in retrieving user" , error});
  }
}

//delete users  
export const deleteUsers = async (req , res) =>{
  try{
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json({message:'user deleted'})
  }catch(err){
      res.status(400).json({message:'user deleted' , err})
}
}


export const createLogin = async (req ,res) => {
try{
const {email , password} = req.body;
const user = await User.findOne({email});
if(!user){
    return res.status(500).json({message:'invalid email'})
}
const match = await bcrypt.compare(password , user.password)
if(!match){
    return res.status(500).json({message:'invalid password'})  
} 
 const token = jwt.sign({ id: user._id, email: user.email },
 process.env.JWT_SECRET, { expiresIn: '1d' });
 res.cookie("token" , token ,{
  httpOnly:true,
  secure:false,
  sameSite:"lax",
  maxAge:24 * 60 * 60 * 1000
 });
 res.json({
 message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }   
});
}catch(err){
    console.log(err);
    res.status(500).json({message:'server error'})
}

}


export const getUserProfile = async (req , res) =>{
    try{
      const user = await User.findById(req.user.id);
      if(!user){
         return res.status(404).json({ message: "User not found" });
      }
      res.json({
        username: user.name,
      email: user.email,
      language: "English",
      address: user.address,
      mobile:user.mobile
      });
    }catch(err){
      res.status(500).json({msg:"something went wrong"});
    }
}

export const userLogout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    expires: new Date(0)
  });

  res.status(200).json({
    message: "Logout successful"
  });
};