import express from 'express';
const routes = express.Router();

routes.get('/' ,(req,res)=>{
    res.send(' hii this users routes !!!')
})



export default routes;