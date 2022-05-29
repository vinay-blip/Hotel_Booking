import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import roomsRoute from "./routes/rooms.js"
import hotelsRoute from "./routes/hotels.js"
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();


const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB");
        // console.log(process.env.MONGO);

    } catch (error) {
        throw error;
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected");
})

// Middlewares
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

// Error Handling Middleware
app.use((err,req,res,next)=>{

//  Method 1   
//    return res.status(500).json("hello error from handler");

// Method 2
const errorStatus = err.status || 500;
const errorMessage = err.message || "Something went wrong";
return res.status(errorStatus).json({
    Success:false,
    status:errorStatus,
    message:errorMessage,
    stack:err.stack,
});
});

app.listen(8800, () => {
    connect();
    console.log("connected to backend");
})