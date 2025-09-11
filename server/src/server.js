import dotenv from 'dotenv';
dotenv.config()
import http from 'http';
import  connectDB from '../src/config/db.js';
import app from './app.js';

const server = http.createServer(app)
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;


connectDB(MONGO_URI).then(() => {
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});