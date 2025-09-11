import express from 'express';
import { createRoom, updateRoom, deleteRoom, Rooms, Room , AvailabilityUpdateRoom} from '../controllers/room.controller.js'
import { verifyAdmin , verifyUser} from '../middlewares/verifyToken.js';

const routes = express.Router();

routes.get('/', Rooms);

routes.get('/:id', Room);

routes.post('/:hotelid', verifyAdmin, createRoom);

routes.put('/:id', verifyAdmin, updateRoom);

routes.put('/availability/:id', verifyUser, AvailabilityUpdateRoom);

routes.delete('/:id', verifyAdmin, deleteRoom);




export default routes;