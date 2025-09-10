import mongoose from "mongoose";
const logger = console;


const connectDB = async (mongoUri) => {
try {
await mongoose.connect(mongoUri, {
useNewUrlParser: true,
useUnifiedTopology: true,
});
logger.log('MongoDB connected');
} catch (err) {
logger.error('MongoDB connection error', err);
process.exit(1);
}
};


export default connectDB;