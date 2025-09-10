import express from 'express';
import {updateusers , userById , Allusers , deleteusers} from '../controllers/user.controller.js';
import  {verifyToken}  from '../utils/verifyToken.js'

const routes = express.Router();

routes.get('/', verifyToken ,  Allusers);

routes.get('/:id',verifyToken , userById);

routes.put('/:id' ,verifyToken, updateusers);

routes.delete('/:id' ,verifyToken, deleteusers);






export default routes;