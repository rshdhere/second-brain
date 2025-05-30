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
    email: {type: String, required:true, unique: true},
    password: {type: String, required:true}
});

const contentType = ['image', 'video', 'blog', 'audio'] // extendable in future

const Content = new Schema({
    title: { type: String, required: true },
    link: { type: String, required: true },
    type: { type: String, required: true, enum: contentType },
    tags: [{ type: Types.ObjectId, ref: 'Tag' }],
    userId: { type: Types.ObjectId, ref: 'users', required: true }
});

const Link = new Schema({
    hash: { type: String, required: true },
    userId: { type: Types.ObjectId, ref: 'users', required: true, unique: true }
});

export const UserModel = mongoose.model('users', User);
export const ContentModel = mongoose.model('contents', Content);
export const LinkModel = mongoose.model('links', Link);
