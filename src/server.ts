import express from "express";
import { ConnectedToDB } from "./database/database";
import userRouter from "./routes/user";
const app = express();

app.use(express.json());


app.use('/api/v1/user', userRouter);

const PORT = process.env.PORT || 3000;

async function StartServer(){
    await ConnectedToDB();
    app.listen(PORT, () => {
        console.log(`your server is listening on http://localhost:${PORT}`)
    });
};

StartServer();