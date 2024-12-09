import bcrypt from "bcryptjs";
import { type NextFunction, type Request, type Response } from "express";
import { sign } from "jsonwebtoken";
import { connectDb } from "../db";
import { loginSchema } from "../models/loginSchema";
import { signupSchema } from "../models/signupSchema";
import userModel from "../models/userModels";

class UserController {

  private static userController : UserController;

  static getInstance() {
    if (!UserController.userController) {
      UserController.userController = new UserController()     
    }
    return UserController.userController;

  }

  async signup(req: Request, res: Response, next : NextFunction) {
    await connectDb();
    try {
      const { name, email, password } = req.body;

      const { success, error } = signupSchema.safeParse({ name, email, password });

      if (!success) {
        return res.status(411).json({
          message: "Invalid inputs",
          success: false,
          error,
        });
      }

      const hashPass = await bcrypt.hash(password, 12);

      const refreshToken = sign(
        { email },
        process.env.REFRESH_TOKEN_SECRET as string,
        { expiresIn: "7d" }
      );

      const user = await userModel.create({
        name,
        email,
        password: hashPass,
        refreshToken,
      });

      await user.save();

      const accessToken = sign(
        { email },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: "30m" }
      );

      res.cookie("Authorization", accessToken, {
        httpOnly: true,
        sameSite: true,
        maxAge: 30 * 60 * 1000,
      });

      res.json({
        message: "User created successfully!",
        success: true,
      });
    } catch (error) {
      console.error(error);
      next(error)
      res.status(500).json({
        message: "Something went wrong!",
        success: false,
      });
    }
  }

  async login(req: Request, res: Response) {
    await connectDb();
    try {
      const { email, password } = req.body;

      const { success, error } = loginSchema.safeParse({ email, password });

      if (!success) {
        return res.status(411).json({
          message: "Invalid inputs",
          success: false,
          error,
        });
      }

      const existingUser = await userModel.findOne({ email });

      if (!existingUser) {
        return res.status(402).json({
          message: "User not found!!",
          success: false,
        });
      }

      const isValid = await bcrypt.compare(password, existingUser.password as string);

      if (!isValid) {
        return res.status(401).json({
          message: "Wrong Password!",
          success: false,
        });
      }

      const accessToken = sign(
        { email },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: "30m" }
      );

      res.cookie("Authorization", accessToken, {
        httpOnly: true,
        sameSite: true,
        maxAge: 30 * 60 * 1000,
      });

      res.json({
        message: "Login successful",
        success: true,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Something went wrong!",
        success: false,
        error,
      });
    }
  }

  async profile(req: Request,res : Response) {
    await connectDb()

    try {

      const email = req.body.email

      const user = await userModel.findOne({email},{
        name : true,
        email : true,
        createdAt : true
      })
      
      if(!user) {
        throw new Error("User not found!")
      }

      res.status(200).json({
        message : "Profile fetched",
        user
      })

    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Something went wrong!",
        success: false,
        error,
      });
    }
  }
}

const userController = UserController.getInstance();

export default userController;
