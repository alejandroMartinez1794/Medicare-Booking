import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoute from './Routes/auth.js';
import userRoute from './Routes/user.js';
import doctorRoute from './Routes/doctor.js';
import reviewRoute from './Routes/review.js';


dotenv.config()

const app = express();
const PORT = process.env.PORT || 8000;

const corsOptions = { 
    origin: true 
};

app.get('/', (req, res) => {
    res.send('La gente, la gente!');
});

// database connection

mongoose.set('strictQuery', false);
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);

    console.log('MongoDB connection SUCCESS');

    } catch (error) { 
        
        console.error('MongoDB connection FAIL', error);
    }
}

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/api/v1/auth', authRoute); // http://localhost:5000/api/v1/auth/register  
app.use('/api/v1/users', userRoute);
app.use('/api/v1/doctors', doctorRoute);
app.use('/api/v1/reviews', reviewRoute);





app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})

