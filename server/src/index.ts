import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import UserRoute from './routes/userRoute';
import dbConnect from './config/dbConnect'

dotenv.config();
const app = express();

dbConnect();

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
}));
app.use(cookieParser());

app.use('/api', UserRoute);

app.listen(3000, () => {
    console.log("Server is running")
})