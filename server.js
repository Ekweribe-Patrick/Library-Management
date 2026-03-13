import express from "express";
const app = express()
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import authorRoutes from "./routes/authorRoutes.js"
import bookRoutes from "./routes/bookRoutes.js"
import borrowBookRoutes from "./routes/borrowBookRoutes.js"
import cors from 'cors'
import { config } from "dotenv";
import cookieParser from "cookie-parser";
config()

let port = process.env.PORT || 100

mongoose.connect(process.env.MONGODB_URL)
    .then(()=> console.log("Mongodb connected successfully"))
    .catch((err)=> console.log(`Error while connecting: ${err}`))

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173/AllUsers',
}))

app.use('/api/user', userRoutes)
app.use('/api/author', authorRoutes)
app.use('/api/book', bookRoutes)
app.use('/api/', borrowBookRoutes)
