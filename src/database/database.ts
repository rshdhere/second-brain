import 'dotenv/config';
import mongoose, { Schema, Types } from "mongoose";

export async function ConnectedToDB(){
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log('connected to mongodb');
    } catch {
        console.log('Error occured while connecting to the database');
    }
}

const userSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const contentTags = ['twitter-post', 'youtube-video', 'youtube-short', 'instagram-reel', 'linkedin-post', 'blog', 'audio'];

const contentSchema = new Schema({
    title: { type: String, required: true },
    link: {type: String, required: true},
    tags: { type: String, enum: contentTags, required: true },
    UserId: { type: Types.ObjectId, ref: 'users', required: true }
})

export const UserModel = mongoose.model('users', userSchema);
export const ContentModel = mongoose.model('content', contentSchema);