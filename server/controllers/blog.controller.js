import express from "express";
import mongoose,{isValidObjectId} from "mongoose"
import { Blog } from "../model/blog.model.js";
import {v2 as cloudinary} from "cloudinary"


export const createBlog = async(req,res)=>{
   
    try {
      if(!req.files || Object.keys(req.files).length===0){
          return res
          .status(400)
          .json({msg:"blog photo is required"})
      }
      const {blogImage} = req.files;
     /* const formatallow = ["/jpeg","/png"]
      if(!formatallow.includes(photo.mimetype)){
          return res
          .status(400)
          .json({msg:"invalid photo type"})
      }*/
  
      if(!blogImage){
          return res
          .status(400)
          .json({msg:"please upload blog photo also"})
      }
    //   const {username,email,phone,password} = req.body;
      const {title , category , about,} = req.body;
      // if we add curly braces , then we have to return manuallly
      if(
          [title,category,about].some((eachField)=>{
             return  eachField?.trim()===""
          })
      ){
          return res.status(400).json({msg:"title , category & about are required field"});
      }
      const adminPhoto = await req?.user?.photo
      const adminName = await req?.user?.username
      const createdBy = await req?.user?._id

      // cloudinary 
      let cloudinaryResponse;
      try {
          cloudinaryResponse = await cloudinary.uploader.upload(
            blogImage.tempFilePath,{
                 resource_type :"auto"
              }
          )
      } catch (error) {
          console.log("error while uploading ",error)
          return res
          .status(500)
          .json({msg:"photo faild to upload"})
          
      }
      // await cloudinary.uploader.upload(filePath,{
      //     resource_type :"auto"
      // })
      if(!cloudinaryResponse){
          console.log("cloudinary error on uploading ");
  
      }
      // console.log("hashed password is ",hashedpassword)
      const blog = await Blog.create({
            title,
            category,
            about,
            blogImage:cloudinaryResponse.url,
            createdBy,
            adminPhoto,
            adminName,
      })
      if(!blog){
          return res
          .status(500)
          .json({msg:"Error while creating blog"})
      }
      return res
      .status(200)
      .json({msg:"Blog Created successfully",blog})
    } catch (error) {
          return res
          .status(500)
          .json({error:"server intenal error "+error})
    }
  
  

};

export const deleteBlog = async(req,res)=>{
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id)
        if(!blog){
            return res
            .status(400)
            .json({msg:"Blog not found"})
        }
        await blog.deleteOne();
        
       return res
        .status(200)
        .json({msg:"Blog delete successfully"})
    } catch (error) {
        return res
        .status(500)
        .json({err:"Internal server error "+ error})
    }


};

export const getAllBlog = async(req,res)=>{
    try {
        const allBlog = await Blog.find({})
     
        return res
        .status(200)
        .json(allBlog)
    } catch (error) {
        return res
        .status
        .json({err:"Internal server error "+error})
    }
}
export const viewBlog = async(req,res)=>{
    const {id}  = req.params
    if(!isValidObjectId(id)){
        return res
        .status(400)
        .json({msg:"Blog not exist"})
    }
    const blog = await Blog.findById(id);
    if(!blog){
        return res
        .status(400)
        .json({msg:"Blog not found"})
    }
    return res
    .status(200)
    .json({blog})
}

export const getMyBlog = async(req,res)=>{

    try {
        const createdBy = req.user?._id
        // console.log("id= ",createdBy)
        const myBlog = await Blog.find({createdBy});
        // console.log(myBlog)
        if(!myBlog || myBlog.length < 1){
            return res
            .status(400)
            .json({msg:"There is no blog or Blog not found"})
        }
        return res
        .status(200)
        .json({myBlog})
    } catch (error) {
        return res
        .status(500)
        .json({err:"Internal server error "+error})
    }

}

export const updateBlog = async(req,res)=>{
   try {
        const {id} = req.params
        if(!isValidObjectId){
            return res
            .status(400)
            .json({msg:"blog not found"})
        }
        const updatedBlog = await Blog.findByIdAndUpdate(id,req.body,
            {
                new:true
            }
        );
    
        if(!updatedBlog){
            return res
            .status(404)
            .json({msg:"Blog not found"});
        }
    
        return res
        .status(200)
        .json({updatedBlog})
   } catch (error) {
        return res
        .status(500)
        .json({err:"internal server error"+ error})
   }


};