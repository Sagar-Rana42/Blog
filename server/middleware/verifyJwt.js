import {User } from "../model/user.model.js"
import jwt, { decode } from "jsonwebtoken"

// authencation

export const verifyJwt = async(req,res,next)=>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res
            .status(400)
            .json({msg:"please login"})
        }
        // console.log("token in verify ",token)
        const decoded =  jwt.verify(token,process.env.TOKEN_SECRET_KEY)
        // console.log("Printing decoded after verify ",decoded);

        // here decoded give some property (un me se 1 dega id use ka userId name se)

        const user = await User.findById(decoded.userId);
        // console.log("Printing user after verify ",user);

        req.user = user;

        next()
    } catch (error) {
        console.log("error in Auth : "+ error.message)
        return res
        .status(401)
        .json({error:"Please login , User is un-authenticated"})
    }
}

/*
export const verifyJwt = async(req,res,next)=>{

    const token = req.cookies?.token
    if(!token){
        return res
        .status(404)
        .json({msg:"please login"})
    }
    const decodedToken = jwt.verify(token,process.env.TOKEN_SECRET_KEY)

    const user = await User.findById(decodedToken.userId);
    req.user = user;
    next();
}*/
