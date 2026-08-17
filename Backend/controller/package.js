import Package from "../models/package.js"

// add package
export const createPackage = async (req, res) => {
  try {
    const { name, price, duration, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const trippackage = new Package({
      name,
      price,
      duration, 
      description,
      image: req.file.filename
    });

    await trippackage.save();
    res.status(200).json({ message: "Package saved" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


//get packages
export const getAllpackages = async (req , res) =>{
    try{
        const  pkg = await Package.find();
        res.json(pkg);
    }catch(err){
        res.status(400).json({message:err.message})
    }
}

//get one package 
export const getPackage = async(req , res) =>{
    try{
        const Pack = await Package.findById(req.params.id)
        res.json(Pack);
    }catch(err){
        res.status(400).json({message:err.message})
    }
}



//update package 
export const updatePackage = async(req , res) =>{
    try{
        const {name , price , description ,duration } = req.body;
        const updateData = {name , price , description , duration}      ;
        if(req.file){
            updateData.file = req.file.filename;
            const updated = await Package.findByIdAndUpdate(req.params.id , updateData , {new:true})
            res.json(updated);
        }
    }catch(err){
        res.status(400).json({message:err.message});
    }
}

//delete package 
export const deletePackage = async (req , res) =>{
    try{
        await Package.findByIdAndDelete(req.params.id);
        res.status(200).json({message:'package deleted'})
    }catch(err){
        res.status(400).json({message:err.message})
    }
}


