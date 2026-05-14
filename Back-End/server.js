import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import userRouter from './routes/userAuth.route.js';
const app = express();

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(cookieParser());

app.use('/api/auth',userRouter);

const port = process.env.PORT;
app.listen(port,()=>{
    connectDB();
    console.log(`your server running on http://localhost:${port}`);
})