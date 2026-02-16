import express from 'express'
import {createQuery , getQuery , updateStatus} from '../controller/enquiries.js'

const router = express.Router();

router.post('/query' , createQuery);
router.get('/query' , getQuery);
router.put('/query/:id' , updateStatus);

export default router