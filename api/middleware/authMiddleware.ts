import type { Request, Response, NextFunction } from "express";
import { verify, type JwtPayload } from "jsonwebtoken";
import { connectDb } from "../utils/db";
import userModel from "../models/userModel";

export const authMiddleware = async (req : Request, res : Response, next : NextFunction) => {
    await connectDb()
    try {
        
        const token = req.cookies?.accessToken || req.headers["authorization"]?.split(" ")[1];

        if(!token) {
            res.status(401)
                .json({
                    message : "Token not found!",
                    success : false
                })   
            return
        }

        const decoded = verify(token,process.env.ACCESS_TOKEN_SECRET as string)

        const user = await userModel.findById((decoded as JwtPayload).id,{
            email : true,
            refreshToken : true,
        })

        console.log("in md" , user)

        req.body.user = user

        next()   

    } catch (error) {
        console.warn(error)
            res.status(500)
                .json({
                message : error,
                success : false
            })
    }
}