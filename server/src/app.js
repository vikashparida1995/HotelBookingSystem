import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser'
import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';
import roomsRoute from './routes/rooms.js';
import hotelsRoute from './routes/hotels.js';
import { errorHandler } from './middlewares/errorHandler.js';
const app = express();
app.use(morgan('dev'));
app.use(helmet());
app.use(cookieParser())
app.use(express.json())

app.get('/', (req,res)=>{
    res.send('This is home pahe of hotel booking application !!!')
})

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/hotel', hotelsRoute)
app.use('/api/v1/user', usersRoute)
app.use('/api/v1/room', roomsRoute)


app.use(errorHandler)


export default app;
