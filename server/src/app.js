import express from 'express';
import dotenv from 'dotenv';
import mongoose, { connect, disconnect } from 'mongoose';
dotenv.config()
import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';
import roomsRoute from './routes/rooms.js';
import hotelsRoute from './routes/hotels.js';
import connectDB  from './config/db.js';
const app = express();
const PORT = process.env.PORT
const logges = console

app.get('/', (req,res)=>{
    res.send('This is home pahe of hotel booking application !!!')
})

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/hotel', hotelsRoute)
app.use('/api/v1/user', usersRoute)
app.use('/api/v1/room', roomsRoute)

app.listen(PORT,async (error)=>{
 if(error) console.log(error);
  await connectDB(process.env.MONGO_URI) 
  console.log(`Server is running on http://localhost:${PORT}/`)
})