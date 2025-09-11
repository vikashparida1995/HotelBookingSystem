import express from 'express';
import {updateusers , userById , Allusers , deleteusers} from '../controllers/user.controller.js';
import  {verifyAdmin, verifyToken , verifyUser}  from '../middlewares/verifyToken.js'

const routes = express.Router();




routes.get('/', verifyAdmin ,Allusers);

routes.get('/:id', verifyUser ,userById);

routes.put('/:id' ,verifyUser ,updateusers);

routes.delete('/:id' , verifyAdmin ,deleteusers);






export default routes;