import hotel from '../models/hotel.model.js'
import {createError} from '../utils/error.js';

export const createHotel = async (req,res,next)=>{
     const newHotel = new hotel(req.body)
        try {
            const saveHotel = await newHotel.save();
          return  res.status(201).json(saveHotel)
        } catch (error) {
           next(error) 
        }
}


export const updateHotels = async (req,res,next)=>{
     try {
           const updateHotel = await hotel.findByIdAndUpdate(req.params.id,{
           $set: req.body
        },{new:this})
          return  res.status(201).json(updateHotel)
        } catch (error) {
            next(error) 
        }
}


export const deleteHotels = async (req,res,next)=>{
    const hotels = hotel.findById(req.params.id);
    if(!hotels) return res.send('hotel is not found !')
    try { 
       const updateHotel = await hotel.findByIdAndUpdate(req.params.id,{
       $set: {delete:true}
    },{new:this})
      return  res.status(201).send('Hotel is deleted')
    } catch (error) {
      next(error) 
    }
}


export const AllHotels = async (req,res,next)=>{
     const failed = false;

        if(failed) return next(createError(401,"you are not authenticated !"))
    
        try {
           const Hotels = await hotel.find(req.params.id)
          return  res.status(200).json(Hotels)
        } catch (error) {
            next(error) 
        }
}

export const HotelById = async (req,res,next)=>{
    try {
           const Hotels = await hotel.findById(req.params.id)
          return  res.status(200).json(Hotels)
        } catch (error) {
           next(error) 
        }
}
