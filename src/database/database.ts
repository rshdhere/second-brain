import 'dotenv/config';
import mongoose, { Types } from "mongoose";
import { Schema } from "mongoose";

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

const contentType = ['image', 'video', 'blog', 'audio'] // extendable in future

const Content = new Schema({
    title: { type: String, require: true },
    link: { type: String, require: true },
    type: { type: String, require: true, enum: contentType },
    tags: [{ type: Types.ObjectId, ref: 'Tag' }],
    userId: { type: Types.ObjectId, ref: 'users', require: true }
});

export const UserModel = mongoose.model('users', User);
export const ContentModel = mongoose.model('contents', Content);
