import express from 'express';
import dotenv from 'dotenv';
import mongoose, { connect, disconnect } from 'mongoose';
dotenv.config()
import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';
import roomsRoute from './routes/rooms.js';
import hotelsRoute from './routes/hotels.js';
import connectDB  from './config/db.js';
import cookieParser from 'cookie-parser'
const app = express();
const PORT = process.env.PORT
const logges = console
app.use(cookieParser())
app.use(express.json())

app.get('/', (req,res)=>{
    res.send('This is home pahe of hotel booking application !!!')
})

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/hotel', hotelsRoute)
app.use('/api/v1/user', usersRoute)
app.use('/api/v1/room', roomsRoute)


app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong !"
   return res.status(500).json(
    {success : false,
    status : errorStatus,
    message : errorMessage,
    stack : err.stack
    }
   )
})

app.listen(PORT,async (error)=>{
 if(error) logges.log(error);
  await connectDB(process.env.MONGO_URI) 
  logges.log(`Server is running on http://localhost:${PORT}/`)
})