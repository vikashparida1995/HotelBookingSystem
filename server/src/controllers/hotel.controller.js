import HotelModel from '../models/hotel.model.js'
import roomModel from '../models/room.model.js';
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
  
  const {min,max,...other} = req.query;
  console.log({min,max,...other})
        try {
           const Hotels = await HotelModel.find({...other,cheapestPrice:{$gt:min || 1,$lt:max || 99999999999999}}).limit(req.query.limit)
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
    const countHotel = await HotelModel.countDocuments({type:"hotel"});
    const countClub = await HotelModel.countDocuments({type:"club"});
    const countBar = await HotelModel.countDocuments({type:"bar"});
    const countApartment = await HotelModel.countDocuments({type:"apartment"});
    const countVilla = await HotelModel.countDocuments({type:"villa"});
    const countcabin = await HotelModel.countDocuments({type:"cabin"});

    try {
          return  res.status(200).send([
            {type:"Hotel" ,count : countHotel},
            {type:"Club" ,count : countClub},
            {type:"Bar" ,count : countBar},
            {type:"villa" ,count : countVilla},
            {type:"Cabin" ,count : countcabin},
            {type:"Apartment" ,count : countApartment},
          ])
        } catch (error) {
           next(createError(401,error)) 
        }
}


export const searchHotelsByLocation = async (req, res, next) => {
  const { lat, long, maxDistance = 5000 } = req.query;  // Default to 5km (5000 meters)

  if (!lat || !long) {
    return next(createError(400, 'Latitude and longitude are required'));
  }

  try {
    const hotels = await HotelModel.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(long), parseFloat(lat)]  // [long, lat]
          },
          $maxDistance: parseFloat(maxDistance)  // In meters
        }
      }
    }).limit(10);  // Limit results for performance; adjust as needed

    if (!hotels.length) {
      return res.status(404).json({ message: 'No hotels found near this location' });
    }

    res.status(200).json(hotels);
  } catch (error) {
    next(createError(500, error.message || 'Error searching hotels'));
  }
};


export const GetHotelRoomId = async (req,res,next)=>{
  try {
    const hotel = await HotelModel.findById(req.params.id);
    if(!hotel) next(createError(401,"this hotel is not found"))
    
    const list = await Promise.all(hotel.rooms.map((room)=>{
         return roomModel.findById(room)
    })) 
    res.status(200).json(list)
   } catch (error) {
    next(createError(401,error));
  }
}

export const updateSpecialPrices = async (req, res ,next) => {
  const { id } = req.params;
  const body = req.body;
  if (!Array.isArray(body)) return next(createError(400,'Array of specials expected'));

  for (const sp of body) {
    if (!sp.startDate || !sp.endDate || typeof sp.price !== 'number') {
      return next(createError(400,"Each special must have startDate,endDate,price"))
    }
  }

  const hotel = await HotelModel.findById(id);
  if (!hotel) return next(createError(400,"Hotel not found"));

  hotel.specialPrices = body.map(s => ({
    startDate: new Date(s.startDate),
    endDate: new Date(s.endDate),
    price: s.price
  }));
  await hotel.save();
  res.json(hotel);
};
