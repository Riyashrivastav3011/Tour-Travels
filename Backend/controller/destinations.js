import Place from "../models/destinations.js"

// add places 
export const createPlace = async (req , res) =>{
    try{
        const {name , description, hotel , resort , nearPlaces, location} = req.body;
        if(!req.file){
            return res.status(400).json({message:'image is required'});
        }
         
    
        const destination = new Place({
           name , description , image:req.file.filename ,hotel , resort,
           nearPlaces , location
          });
        await destination.save();
        res.status(200).json({message:'place added successfully'})
    }catch(err){
        res.status(400).json({message:err.message})
    }
}

//get places 
export const getPlaces = async (req , res) =>{
   try{
     const Places = await Place.find();
    res.json(Places);
   }catch(err){
    res.status(400).json({message:err.message})
   }
}
//get one place
export const getOnePlace = async (req , res) =>{
   try{
     const place = await Place.findById(req.params.id);
    res.json(place);
   }catch(err){
    res.status(400).json({message:err.message})
   }
}


//update places 
export const updatePlace = async (req, res) => {
  try {
    const { name, description, hotel, resort, nearPlaces, location } = req.body;

    // Build update object
    let updateData = {};

    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (hotel) updateData.hotel = hotel;
    if (resort) updateData.resort = resort;
    if (nearPlaces) updateData.nearPlaces = nearPlaces;
    if (location) updateData.location = location;


    // If image updated
    if (req.file) {
      updateData.image = req.file.filename;
    }

    
    const updatedPlace = await Place.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedPlace) {
      return res.status(404).json({ message: "Place not found" });
    }

    res.status(200).json({
      message: "Place updated successfully",
      data: updatedPlace,
    });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



//delete places
export const deletePlace = async (req , res) =>{
    try{
        await Place.findByIdAndDelete(req.params.id);
        res.status(200).json({message:'place deleted'});
    }catch(err){
        res.status(400).json({message:err.message});
    }
}


