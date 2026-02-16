import Enquiry from '../models/enquires.js'


export const createQuery = async (req , res) =>{
    try{
        const {name , email , mobile , message} = req.body;
        const enquiry = new Enquiry({name , email , mobile , message});
        await enquiry.save();
        res.status(200).json({message:'you query will resolvve soon'})
    }
    catch(err){
        res.statusl.json({message:'server error' , err})        
    }
}

export const getQuery = async (req , res) =>{
    try{
        const queries = await Enquiry.find();
        res.status(200).json({message:'all queries get' , queries})      
    }
    catch(err){
        res.status(400).json({message:'somthing went wrong' , err})
    }
}


export const updateStatus = async (req , res) =>{
    try{
        const {id} = req.params;
        const {status} = req.body;
        await Enquiry.findByIdAndUpdate(id , {status} , {new:true})
        res.status(200).json({message:'status updated' })
    }catch(err){
        res.status(500).json({message:'something went wrong' , err})
    }
}

