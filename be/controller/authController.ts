import express from "express";
import bcrypt from "bcryptjs";
import { connectDb } from "../db";
import { sign } from "jsonwebtoken";
import userModel from "../models/userModels";
import middleware from "../middleware/requireAuth";
import { loginSchema } from "../models/loginSchema";
import { signupSchema } from "../models/signupSchema";
import alreadyLogged from "../middleware/accessToken";

const userRouter = express.Router();

userRouter.post("/signup", alreadyLogged, async (req, res) => {
  await connectDb();

  try {
    const { name, email, password } = req.body;
    
    const { success,error } = signupSchema.safeParse({name,email,password})

    if(!success) {
      res.status(411).json({
        message: "Invalid inputs",
        success: false,
        error
      });
    }
    const hashPass = await bcrypt.hash(password, 12);

    const refreshToken = sign(
      { email },
      process.env.REFRESH_TOKEN_SECRET as string,
      {
        expiresIn: "7d",
      }
    );

    const user = userModel.create({
      name,
      email,
      password: hashPass,
      refreshToken,
    });

    (await user).save()

    const accessToken = sign(
      { email },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "30m" }
    );

    res.cookie("Authorization", accessToken, {
      httpOnly : true,
      sameSite : true,
      maxAge : 30 * 60 * 1000
    })

    res.json({
      message: "User created successfully!",
      success: true,
    });
  } catch (error) {
    console.log(error)
    res.json({
      message: "Something went wrong!",
      success: false,
    });
  }
});

userRouter.post("/login", alreadyLogged,  async (req, res) => {
  await connectDb();
  try {
    const { email, password } = req.body;

    const { success,error } = loginSchema.safeParse({email,password})

    if(!success) {
      res.status(411).json({
        message: "Invalid inputs",
        success: false,
        error
      });
    }

    const existingUser = await userModel.findOne({
      email,
    });

    if (!existingUser) {
      res.status(402).json({
        message: "User not found!!",
        success: false,
      });
    }

    const isValid = await bcrypt.compare(password, existingUser?.password as string);

    if (!isValid) {
      res.json({
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
      httpOnly : true,
      sameSite : true,
      maxAge : 30 * 60 * 1000
    })

    res.json({
        message : "Login successfull",
        success : true
    })

  } catch (error) {
    
    res.json({
      message: "Something went wrong!",
      success: false,
      error
    });
  }
});

userRouter.get("/check",alreadyLogged,(req,res) => {
  res.json({
    message: "Access granted to protected resource.",
    success: true,
  });
})



export default userRouter;
