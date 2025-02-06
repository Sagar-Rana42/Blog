import mongoose from "mongoose";
import validator from "validator";

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    blogImage:{
        type:String,
        required:true,

    },
    category:{
        type:String,
        required:true
    },
    about:{
        type:String,
        required:true,
        minlength:[200 ,"should contain atleast 200 character"]
    },
    adminName:{
        type:String
    },
    adminPhoto:{
        type:String
    },
    createdBy:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },

},{timestamps:true})

export const Blog = mongoose.model("Blog" , blogSchema)