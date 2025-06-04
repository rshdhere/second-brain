import 'dotenv/config';
import mongoose from "mongoose";
import { Schema, ObjectId } from "mongoose";

export async function ConnectedToDB(){
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log('connected to mongodb');
    } catch {
        console.log('Error occured while connecting to the database');
    }
}

const userSchema = new Schema({
    email: String,
    password: String
});

export const UserModel = mongoose.model('users', userSchema);