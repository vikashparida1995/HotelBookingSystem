import user from '../models/user.model.js'
import {createError} from '../utils/error.js';


export const updateusers = async (req,res,next)=>{
     try {
           const updateuser = await user.findByIdAndUpdate(req.params.id,{
           $set: req.body
        },{new:this})
          return  res.status(201).json(updateuser)
        } catch (error) {
            next(error) 
        }
}


export const deleteusers = async (req,res,next)=>{
    const users = user.findById(req.params.id);
    if(!users) return res.send('user is not found !')
    try { 
       const updateuser = await user.deleteOne(req.params.id)
      return  res.status(201).send('user is deleted')
    } catch (error) {
      next(error) 
    }
}


export const Allusers = async (req,res,next)=>{
     const failed = false;

        if(failed) return next(createError(401,"you are not authenticated !"))
    
        try {
           const users = await user.find(req.params.id)
          return  res.status(200).json(users)
        } catch (error) {
            next(error) 
        }
}

export const userById = async (req,res,next)=>{
    try {
           const users = await user.findById(req.params.id)
          return  res.status(200).json(users)
        } catch (error) {
           next(error) 
        }
}
