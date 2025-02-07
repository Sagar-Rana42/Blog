
import express from "express";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import dotenv from "dotenv"
import {v2 as cloudinary} from "cloudinary"
import connectDB from "./DB/index.js";
import userRoute from "./route/user.route.js"
import blogRoute from "./route/blog.route.js"
import cors from "cors"



const app = express();
dotenv.config()


const port = process.env.PORT || 4000;


app.use(express.json({limit:"16kb"})) /// data me kuch bhi aa sakta hai ,that's why (from form , json type)
app.use(express.urlencoded({extended:true , limit:"16kb"})) // data came from link  , object bhi aa sakta hai 
app.use(express.static("public"));
app.use(cookieParser());

// CORS
// app.use(cors())



app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);


app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// connect DB function are coming from DB folder
connectDB()
.then(()=>{
    app.listen(port,()=>{
        // console.log(`App is listening on port no : ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("Mongo db connection failed");
})


// route declearation 
app.use("/api/v1/users",userRoute)
app.use("/api/v1/blogs",blogRoute)


// config cloudinary
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEYS,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

