import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import cors from 'cors'

const app = express();

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.get('/',(req,res)=> res.send('hi zufair'))
const port = process.env.PORT;
app.listen(port,()=>{
    connectDB();
    console.log(`your server running on http://localhost:${port}`);
})