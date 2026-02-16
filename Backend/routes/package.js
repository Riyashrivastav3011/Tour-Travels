import express from 'express'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from "url";
import { createPackage , getAllpackages , updatePackage , deletePackage, getPackage } from '../controller/package.js';
const router = express.Router();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads")); // correct uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // KEEP ORIGINAL NAME
  }
});


const upload = multer({ storage });

//routes
router.post('/package' , upload.single("image") , createPackage);
router.get('/package' , getAllpackages)
router.get('/package/:id' , getPackage)
router.put('/package/:id' , upload.single("image") , updatePackage);
router.delete('/package/:id' , deletePackage);


export default router;
