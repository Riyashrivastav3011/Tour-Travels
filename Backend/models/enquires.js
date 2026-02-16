import mongoose from 'mongoose'

const enquirySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    mobile:{
       type:String,
       required:true 
    },
    email:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:'pending'
    }
})

export default mongoose.model('Enquiries' , enquirySchema);

