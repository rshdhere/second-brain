import 'dotenv/config';
import mongoose from "mongoose";
import { Schema, ObjectId } from "mongoose";

export async function ConnectToDB(){
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log('connected to mongodb-database');
    } catch(error) {
        console.error('error occured while connecting to database, at', error);
    };
};

const User = new Schema({
    email: {type: String, require:true, unique: true},
    password: {type: String, require:true}
});

export const UserModel = mongoose.model('users', User);
