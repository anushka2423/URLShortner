import mongoose from "mongoose";

export async function connectDB(URL) {
    return mongoose.connect(URL);
}