import mongoose from "mongoose";
const { Schema, model } = mongoose;

const SpecialPriceSchema = new Schema({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  price: { type: Number, required: true, min: 0 },
});


const hotelSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],  // [longitude, latitude]
            required: true
        }
    },
    distance: {
        type: String,
        required: true
    },
    photo: {
        type: [String],

    },
    desc: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    rooms: {
        type: [String],

    },
    defaultPrice: { 
        type: Number,
         min: 1000,
    },
    specialPrices: [SpecialPriceSchema],
    featured: {
        type: Boolean,
        default: false
    }
})

hotelSchema.index({ location: '2dsphere' });


export default model('Hotel', hotelSchema);