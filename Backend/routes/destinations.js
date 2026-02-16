import express from 'express'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import { createPlace , getPlaces ,getOnePlace, updatePlace , deletePlace } from '../controller/destinations.js'
const router = express.Router();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: (req , file , cb) =>{
        cb(null  , path.join(__dirname , "../uploads"))
    },
    filename : (req , file , cb) =>{
        cb(null , file.originalname);
    }
});

const upload = multer({storage});

//routes
router.post('/place', upload.single('image'), createPlace);
router.get('/place' , getPlaces);
router.get('/place/:id' , getOnePlace)
router.put('/place/:id' , upload.single('image'), updatePlace);
router.delete('/place/:id' , deletePlace);


export default router;