import express from 'express';
import { createHotel , updateHotels ,deleteHotel ,AllHotels,HotelById} from '../controllers/hotel.controller.js';
import { verifyAdmin } from '../middlewares/verifyToken.js';

const routes = express.Router();

routes.get('/' , AllHotels);

routes.get('/:id', HotelById);

routes.post('/' , verifyAdmin ,createHotel);

routes.put('/:id' , verifyAdmin ,updateHotels);

routes.delete('/:id' ,verifyAdmin , deleteHotel);




export default routes;