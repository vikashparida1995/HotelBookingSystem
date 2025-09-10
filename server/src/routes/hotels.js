import express from 'express';
const routes = express.Router();

routes.get('/' ,(req,res)=>{
    res.send(' hii this hotels routes !!!')
})



export default routes;