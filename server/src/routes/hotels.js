import express from 'express';
import { createHotel, updateHotel, deleteHotel, hotels, hotel, CountByCity, CountByType ,searchHotelsByLocation , GetHotelByRoomId} from '../controllers/hotel.controller.js';
import { verifyAdmin } from '../middlewares/verifyToken.js';

const routes = express.Router();

routes.get('/', hotels);

routes.get('/search' , searchHotelsByLocation) 

routes.get('/find/:id', hotel);

routes.post('/', verifyAdmin, createHotel);

routes.put('/:id', verifyAdmin, updateHotel);

routes.delete('/:id', verifyAdmin, deleteHotel);

routes.get('/countByCity', CountByCity);

routes.get('/countByType', CountByType);

routes.get('/room/:id', GetHotelByRoomId);


export default routes;