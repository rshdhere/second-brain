import express from 'express';

import { ConnectToDB } from "./database/database";
import userRouter from './routes/user';

const app = express();

// middleware for parsing user data
app.use(express.json());

app.use('/api/v1/user', userRouter);

async function StartServer(){
    await ConnectToDB();
    app.listen(3000, () => {
        console.log('your server is running on http://localhost:3000');
    });
};

StartServer();
