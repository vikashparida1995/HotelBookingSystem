import express from 'express';
import {updateusers , userById , Allusers , deleteusers} from '../controllers/user.controller.js';
import  {verifyAdmin, verifyToken , verifyUser}  from '../middlewares/verifyToken.js'

const routes = express.Router();

routes.get('/chackauthentcation', verifyToken , (req,res,next)=>{
    res.send("hello user your are login in")
} )

routes.get('/checkauthrization/:id', verifyUser ,(req,res,next)=>{
    res.send("hello user you are loggin in a and you can delete you account")
})

routes.get('/checkAdmin/:id', verifyAdmin ,(req,res,next)=>{
    res.send("hello user you are is admin ")
})


routes.get('/', Allusers);

routes.get('/:id', userById);

routes.put('/:id' ,updateusers);

routes.delete('/:id' , deleteusers);






export default routes;