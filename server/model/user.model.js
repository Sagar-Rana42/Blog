import mongoose ,{Mongoose, Schema}from "mongoose";
import validator from "validator"

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        
    },
    phone:{
        type:Number,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    token:{
        type:String
    },
    password:{
        type:String,
        required:true,
        
    }
},{timestamps:true})

export const User = mongoose.model("User" , userSchema)