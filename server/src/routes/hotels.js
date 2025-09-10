import express from 'express';
import { createHotel , updateHotels ,deleteHotel ,AllHotels,HotelById} from '../controllers/hotel.controller.js';

const routes = express.Router();

routes.get('/', AllHotels);

routes.get('/:id', HotelById);

routes.post('/' , createHotel);

routes.put('/:id' , updateHotels);

routes.delete('/:id' , deleteHotel);






export default routes;