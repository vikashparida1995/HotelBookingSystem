import RoomModel from '../models/room.model.js'
import HotelModel from '../models/hotel.model.js'
import { createError } from '../utils/error.js';


export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    const newRoom = new RoomModel(req.body);

    try {
        const saveRoom = await newRoom.save();
        try {
            await HotelModel.findByIdAndUpdate(hotelId, {
                $push: { rooms: saveRoom._id }
            })
        } catch (error) {
            next(createError(401, error))
        }

        res.status(201).json(saveRoom);
    } catch (error) {
        next(createError(401, error))
    }
}



export const updateRoom = async (req, res, next) => {
    try {
        const updateRoom = await RoomModel.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: this })
        return res.status(201).json(updateRoom)
    } catch (error) {
        next(createError(401, error))
    }
}

export const AvailabilityUpdateRoom = async (req,res,next)=>{
     try {
       await RoomModel.updateOne({"roomNo._id":req.params.id},{
        $push:{"roomNo.$.unavailableDates": req.body.dates}
       })
        return res.status(201).send("room is update")
    } catch (error) {
        next(createError(401, error))
    }
}


export const deleteRoom = async (req, res, next) => {
    const hotelId = req.body.hotelid;
    try {
        await RoomModel.findByIdAndDelete(req.params.id)
        try {
            await HotelModel.findByIdAndUpdate(hotelId, {
                $pull: { rooms: req.params.id }
            })
        } catch (error) {
            next(createError(401, error))
        }
        return res.status(201).send('room is deleted')
    } catch (error) {
        next(createError(401, error))
    }
}


export const Rooms = async (req, res, next) => {

    try {
        const rooms = await RoomModel.find(req.params.id)
        return res.status(200).json(rooms)
    } catch (error) {
        next(createError(401, error))
    }
}

export const Room = async (req, res, next) => {
    try {
        const room = await RoomModel.findById(req.params.id)
        return res.status(200).json(room)
    } catch (error) {
        next(createError(401, error))
    }
}


export const CountByCity = async (req, res, next) => {
    try {
        const room = await RoomModel.findById(req.query.cityName)
        return res.status(200).json(room)
    } catch (error) {
        next(createError(401, error))
    }
}

export const CountByType = async (req, res, next) => {
    try {
        const room = await RoomModel.findById(req.query.cityName)
        return res.status(200).json(room)
    } catch (error) {
        next(createError(401, error))
    }
}



