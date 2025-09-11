import HotelModel from '../models/hotel.model.js'
import {createError} from '../utils/error.js';

export const createHotel = async (req,res,next)=>{
     const newHotel = new HotelModel(req.body)
        try {
            const saveHotel = await newHotel.save();
          return  res.status(201).json(saveHotel)
        } catch (error) {
           next(error) 
        }
}


export const updateHotel = async (req,res,next)=>{
     try {
           const updateHotel = await HotelModel.findByIdAndUpdate(req.params.id,{
           $set: req.body
        },{new:this})
          return  res.status(201).json(updateHotel)
        } catch (error) {
            next(error) 
        }
}


export const deleteHotel = async (req,res,next)=>{
    const hotels = HotelModel.findById(req.params.id);
    if(!hotels) return res.send('hotel is not found !')
    try { 
       const updateHotel = await HotelModel.findByIdAndUpdate(req.params.id,{
       $set: {delete:true}
    },{new:this})
      return  res.status(201).send('Hotel is deleted')
    } catch (error) {
      next(error) 
    }
}


export const hotels = async (req,res,next)=>{
   
        try {
           const Hotels = await HotelModel.find(req.params.id)
          return  res.status(200).json(Hotels)
        } catch (error) {
            next(error) 
        }
}

export const hotel = async (req,res,next)=>{
    try {
           const Hotels = await HotelModel.findById(req.params.id)
          return  res.status(200).json(Hotels)
        } catch (error) {
           next(error) 
        }
}


export const CountByCity = async (req,res,next)=>{
  const cityName = req.query.cityName.split(',')
    try {
         const list = await Promise.all(cityName.map((city)=>{
           return HotelModel.countDocuments({city:city})
         }))
          return  res.status(200).json({count : list})
        } catch (error) {
           next(createError(401,error)) 
        }
}

export const CountByType = async (req,res,next)=>{
  const typeNmame = req.query.type.split(',')
    try {
         const list = await Promise.all(typeNmame.map((type)=>{
           return HotelModel.countDocuments({type:type})
         }))
          return  res.status(200).json({count : list})
        } catch (error) {
           next(createError(401,error)) 
        }
}

