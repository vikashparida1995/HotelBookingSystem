import express from 'express';
const routes = express.Router();

routes.get('/' ,(req,res)=>{
    res.send(' hii this rooms routes !!!')
})



export default routes;