import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Mongodb connected');
    } catch (err) {
        console.log('Mongodb connection faild', err);
        process.exit(1);
    }
};

export default connectDB;
