import mongoose from 'mongoose'

const placeSchema = new mongoose.Schema({
    name :{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
     hotel: {
        type:String
     },
    resort: {
        type:String
    },
     nearPlaces: {
        type : String 
     },
     location: {
        type : String 

    }
});

export default mongoose.model('destinations' , placeSchema);