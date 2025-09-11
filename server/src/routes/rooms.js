import express from 'express';
import {createRoom,updateRoom,deleteRoom,Rooms,Room} from '../controllers/room.controller.js'
import { verifyAdmin } from '../middlewares/verifyToken.js';

const routes = express.Router();

routes.get('/' , Rooms);

routes.get('/find/:id', Room);

routes.post('/:hotelid' , verifyAdmin ,createRoom);

routes.put('/:id' , verifyAdmin ,updateRoom);

routes.delete('/:id' ,verifyAdmin , deleteRoom);




export default routes;