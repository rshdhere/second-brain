import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import { ConnectToDB } from "./database";

const app = express();

app.post('/api/v1/sign-up', (req, res) => {

});

app.post('/api/v1/sign-in', (req, res) => {

});

app.post('/api/v1/content', (req, res) => {

});

app.get('/api/v1/content', (req, res) => {

});

app.delete('/api/v1/content', (req, res) => {

});

app.post('/api/v1/brain/share', (req, res) => {

});

app.get('/api/v1/brain/:shareLink', (req, res) => {

});

async function StartServer(){
    await ConnectToDB();
    app.listen(3000, () => {
        console.log('your server is running on http://localhost:3000');
    });
};

StartServer();
