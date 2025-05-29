import express from 'express';

import { ConnectToDB } from "./database/database";
import userRouter from './routes/user';

const app = express();

// middleware for parsing user data
app.use(express.json());

app.use('/api/v1/user', userRouter);

const PORT = process.env.PORT || 3000;

async function StartServer(){
    await ConnectToDB();
    app.listen(PORT, () => {
        console.log(`your server is running on http://localhost:${PORT}`);
    });
};

StartServer();
