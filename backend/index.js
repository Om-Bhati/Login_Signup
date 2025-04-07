import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { UserRouter } from './routes/user.route.js'

const app = express();
dotenv.config()

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173', // Explicitly allow the front-end origin
    credentials: true,  // Allow credentials (cookies, authorization headers, etc.)
}))
app.use(cookieParser())
app.use('/auth', UserRouter);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.Mongo_URL).then((e) => {
    console.log("Mongodb connected successfully ");
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    })
}).catch((e) => {
    console.log(e);
})

