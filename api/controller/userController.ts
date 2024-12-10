import bcrypt from "bcryptjs";
import { type Request, type Response } from "express";
import { verify, type JwtPayload } from "jsonwebtoken";
import { loginSchema } from "../models/loginSchema";
import { signupSchema } from "../models/signUpSchema";
import userModel from "../models/userModel";
import { cookieOptions } from "../utils/config";
import { connectDb } from "../utils/db";
import { generateAccessToken, generateRefreshToken } from "../utils/tokens";
import blackListModel from "../models/expiredTokenModel";

class UserController {
    private static userController : UserController;

    static getInstance() {
        if(!UserController.userController) {
            UserController.userController = new UserController()
        }

        return UserController.userController;
    }

    async login(req : Request,res : Response) {
        await connectDb();

        try {
            const payload = req.body

            const validation = loginSchema.safeParse(payload)

            if(!validation.success) {
                throw new Error(validation.error?.message)
            }

            const {email,password} = validation.data

            const existingUser = await userModel.findOne({email})

            if(!existingUser) throw new Error("User not found")

            const isValid = await bcrypt.compare(password,existingUser.password);

            if(!isValid) throw new Error("Wrong password!");

            const accessToken = await generateAccessToken(existingUser._id as string)
            const refreshToken = await generateRefreshToken(existingUser._id as string)

            await userModel.updateOne({_id : existingUser._id}, {
                "$set" : {
                    refreshToken : refreshToken
                }
            })

            res.status(200)
                .cookie("accessToken", accessToken, cookieOptions)
                .cookie("refreshToken", refreshToken, cookieOptions)
                .json({
                    message : "Login successfull",
                    success : true,
                    accessToken
                })
            
        } catch (error) {
            console.warn(error)
            res.status(500).json({
                message : error,
                success : false
            })
        }

    }

    async signup(req : Request, res : Response) {
        await connectDb();

        try {
            const payload = req.body

            const validation = signupSchema.safeParse(payload)

            if(!validation.success) {
                throw new Error(validation.error?.message)
            }

            const {name,email,password} = validation.data

            const hash = await bcrypt.hash(password,10);

            const existingUser = await userModel.findOne({email})

            if(existingUser) throw new Error("User with this email already exists, use a different email!")

            const user = await userModel.create({
                name,
                email,
                password : hash
            })

            user.save()
     
            const accessToken = await generateAccessToken(user._id as string)
            const refreshToken = await generateRefreshToken(user._id as string)
            
            user.refreshToken = refreshToken;

            res.status(200)
                .cookie("accessToken", accessToken, cookieOptions)
                .cookie("refreshToken", refreshToken, cookieOptions)
                .json({
                    message : "Signup successfull",
                    success : true,
                    accessToken,
                })

            
        } catch (error) {
            console.warn(error)
            res.status(500).json({
                message : error,
                success : false
            })
        }
    }

    async logout(req : Request, res : Response) {

        await connectDb()

        try {
        const id = req.body.user.id
        const refreshToken = req.body.user.refreshToken

        console.log(req.body.user)

        await blackListModel.create({
            token : refreshToken
        })
        
        const user = await userModel.findByIdAndUpdate(id,{
            refreshToken : ""
        })

        user?.save();

        res.status(200)
            .clearCookie("accessToken", cookieOptions)
            .clearCookie("refreshToken", cookieOptions)
            .json({
                message : "Logout successfull",
                success : true
            })
        } catch (error) {
            console.warn(error)
            res.status(500).json({
                message : error,
                success : false
            })
        }

        
    }

    async refresh(req : Request, res : Response) {
        await connectDb()
        try {

            const token = req.cookies.refreshToken;
            if(!token) {
                res.status(401)
                    .json({
                        message : "Unauthorized",
                        success : false
                    })
                return
            }

            const isInvalid = await blackListModel.findOne({token})

            if(isInvalid) throw new Error("Token is expired! or malformed")

            const decoded = verify(token,process.env.REFRESH_TOKEN_SECRET as string)

            const user = await userModel.findById((decoded as JwtPayload).id)

            if(!user) {
                res.status(404)
                    .json({ 
                        message : "User not Found!",
                        success : false
                    })

                return
            }

            if(token !== user?.refreshToken) {
                res.status(401)
                .json({
                    message : "Unauthorized!",
                    success : false
                })
                return
            }

            const accessToken = generateAccessToken(user?._id as string)
            const refreshToken = generateRefreshToken(user?._id as string)

            res.status(200)
                .cookie("accessToken", accessToken, cookieOptions)
                .cookie("refreshToken", refreshToken, cookieOptions)
                .json({
                    message : "Token refreshed successfully",
                    success : true,
                    accessToken,
                })

        } catch (error) {
            console.warn(error)
            res.status(500).json({
                message : error,
                success : false
            })
        }
        
    }

    async verify(req : Request, res : Response) {
        await connectDb()

        try {

            const id = req.body.user.id;

            const user = await userModel.findById(id,{
                name : true,
                email : true,
                createdAt : true
            })

            res.status(200)
                .json({
                    message : "Valid user",
                    success : true,
                    user
                })
            
        } catch (error) {
            console.warn(error)
            res.status(500).json({
                message : error,
                success : false
            })
        }
    }
}

const userController = UserController.getInstance();

export default userController;