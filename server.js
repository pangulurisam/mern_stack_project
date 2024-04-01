
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from 'morgan'
import {connect} from "mongoose";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js"
import cors from 'cors'
import productRoutes from "./routes/productRoutes.js"
import path from 'path'

//configure env
dotenv.config();

//rest object
const app=express();


//database config
connectDB();

//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname,'./client/build')))

//routes
app.use("/api/v1/auth/",authRoute);
app.use("/api/v1/category",categoryRoutes);
app.use("/api/v1/product",productRoutes);



//rest api
app.use('*',function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
})

//PORT
const PORT=process.env.PORT||5000;

//Run Listen
app.listen(PORT,()=>{
    console.log(`Server is running on port ${process.env.DEV_MODE} mode on port ${PORT}`);
}); 