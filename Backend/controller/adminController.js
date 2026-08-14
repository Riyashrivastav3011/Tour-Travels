import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const adminSignup = async (req , res) =>{
    try{
        const {email , password} = req.body;
        const hashed = await bcrypt.hash(password , 10);
        const admin = new Admin({email , password:hashed})
        await admin.save();
        res.status(200).json({message:"admin registered"});  
    }catch(err){
        console.log(err);
        res.status(500).json({message:"internal server error"});
    }
}


export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check admin exists
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: "Invalid email" });
        }

        // Match password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Create token
        const token = jwt.sign(
            { id: admin._id, role: "admin" },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie('admintoken' , token ,{
            httpOnly:true,
            sameSite:'lax',
            secure:'true',
            maxAge:24 * 60 * 60* 1000
        })

        return res.status(200).json({
            message: "Admin login successful",
            admin: { id: admin._id, email: admin.email }
           });

    }catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};

export const adminLogout = (req , res) =>{
    res.clearCookie('adminToken' , {
        httpOnly:true,
        secure:false,
        sameSite:'lax'
    });

    res.status(200).json({
       msg:'logout',
       success:true
    })
}