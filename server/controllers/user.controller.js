import mongoose from "mongoose";
import express from "express";
import cloudinary from "cloudinary"
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
import { User } from "../model/user.model.js";


const generateToken = async (userId,res) => {
   
    const user = await User.findById(userId);
    let accessToken = jwt.sign({ userId }, process.env.TOKEN_SECRET_KEY, {
        expiresIn: "7d"
    });
    user.token = accessToken;
    await user.save({validateBeforeSave:false})
    res.cookie("token", accessToken, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production", // HTTPS only in production
        sameSite: "none",
       
    });

    // await User.findByIdAndUpdate(userId,{accessToken}); 

    return accessToken ; // don't need to return 
};

export const registerUser = async(req,res)=>{
    try {
      if(!req.files || Object.keys(req.files).length===0){
          return res
          .status(400)
          .json({msg:"user photo is required"})
      }
      const {photo} = req.files;
     /* const formatallow = ["/jpeg","/png"]
      if(!formatallow.includes(photo.mimetype)){
          return res
          .status(400)
          .json({msg:"invalid photo type"})
      }*/
  
      if(!photo){
          return res
          .status(400)
          .json({msg:"please upload photo also"})
      }
      const {username,email,phone,password} = req.body;
      // if we add curly braces , then we have to return manuallly
      if(
          [username,email,phone,password].some((eachField)=>{
             return  eachField?.trim()===""
          })
      ){
          return res.status(400).json({msg:"all field required"});
      }
      
      const existedUser =await User.findOne({
          $or: [ {username}, {email} ]
      })
      if(existedUser){
          return res
          .status(400)
          .json({msg:"User already exist with this email or username"})
      }
      // cloudinary 
      let cloudinaryResponse;
      try {
          cloudinaryResponse = await cloudinary.uploader.upload(
              photo.tempFilePath,{
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
      const hashedpassword = await bcrypt.hash(password,10);
      // console.log("hashed password is ",hashedpassword)
      const user = await User.create({
          username:username.toLowerCase(),
          // email:email same as 
          email,
          password:hashedpassword,
          phone,
          photo:cloudinaryResponse.url
      })
      const createduser = await User.findById(user._id).select(
          // kya kya select nai karna hai , 
          "-password"
      )
      if(!createduser){
          return res
          .status(500)
          .json({msg:"Error while creating user"})
      }
      return res
      .status(200)
      .json({msg:"User registered successfully",createduser})
 
    } catch (error) {
         return res
         .status(500)
         .json({error:"Internal server error , while registering"+error})
    }
 
};

export const login = async(req,res)=>{

    try {
        const {username,email,password} = req.body;
        if(!username && !email){
            return res
            .status(400)
            .json({msg:"Enter username or email"})
        }
        const user = await User.findOne({
            $or:[{username},{email}]
        })
        // console.log("Print user from save in login " , user);
        if(!user){
            return res
            .status(400)
            .json({msg:"User Not Found"})
        }
        const isPasswordCorrect =await bcrypt.compare(password , user.password)
    
        if(!isPasswordCorrect){
            return res
            .status(400)
            .json({msg:"Wrong password"})
        }
        await generateToken(user._id,res);
        
    
        const loggedInUser = await User.findById(user._id).select("-password")
        // console.log("loggedInUserinfo ",loggedInUser);
    
        /*const option = {
            httpOnly:true,
            secure:true
        }*/
        //here we can return token from func and save in here now  in res and also can set there in function 
        return res
        .status(200)
        .json({msg:"User login Successfully",loggedInUser})

    } catch (error) {
        return res
        .status(500)
        .json({error:"Internal server error"+error});
    }

};

export const logout = async(req,res)=>{
    // const token = req.user.token
    // console.log("printing before ",req.user)
    await User.findByIdAndUpdate(req.user?._id,
        

        {
            $unset:{
                token:1
            }
        },
        {
            // new wala value do , b'coz previous wala me token ho sakta hai
            new:true
        }
    )
    // console.log("printing after unset ",req.user?.token)

    try {
        res.clearCookie("token",{httpOnly:true,secure:true});
        // console.log("printing after clear ",req.user?.token)
    
        return res
        .status(200)
        .json({msg:"Logged out successfully"});
    } catch (error) {
        return res
        .status(500)
        .json({error:"Internal error while logout"+error})
    }
}

export const getMyProfile = async(req,res)=>{
    const user  = await req.user
    if(!user){
        return res
        .status(404)
        .json({msg:"user not found"})
    }
    
    return res.status(200).json({user})

}

export const allCreator = async(req,res)=>{
    const allUser = await User.find()
    if(!allUser){
        return res
        .status(400)
        .json({msg:"Creator not found"})
    }
    return res.status(200).json(allUser)

}