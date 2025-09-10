import express from 'express';
import dotenv from 'dotenv';
import mongoose, { connect, disconnect } from 'mongoose';
dotenv.config()
import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';
import roomsRoute from './routes/rooms.js';
import hotelsRoute from './routes/hotels.js';
const app = express();
const PORT = process.env.PORT
const logges = console


const connectDB = async () => {
    try {
     await   mongoose.connect(process.env.MONGO_URI)
           
        logges.log("connect to database")
       
        
    } catch (error) {
       throw error
    }
}

mongoose.connection.on('disconnected',()=>{
    logges.log("mongoDB is disconnect")
})

mongoose.connection.on('connected', ()=>{
   logges.log(" mongodb is connected ")
})

app.get('/', (req,res)=>{
    res.send('This is home pahe of hotel booking application !!!')
})

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/hotel', hotelsRoute)
app.use('/api/v1/user', usersRoute)
app.use('/api/v1/room', roomsRoute)

app.listen(PORT,async (error)=>{
 if(error) console.log(error);
  await connectDB() 
  console.log(`Server is running on http://localhost:${PORT}/`)
})