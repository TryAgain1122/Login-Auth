import mongoose from 'mongoose';

const dbConnect = async () => {
    try {
        mongoose.connect(process.env.DB_URL!);
        console.log("Connected to mongoDB")
    } catch (error) {
        console.log(error)
        process.exit(1);
    }
}

export default dbConnect;