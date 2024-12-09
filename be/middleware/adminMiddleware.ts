import express from "express";
import { verify, type JwtPayload } from "jsonwebtoken";
import userModel from "../models/userModels";
import { connectDb } from "../db";

const adminMiddleware = express.Router();

adminMiddleware.use(async (req, res, next) => {
  try {
    await connectDb();

    const token = req.cookies?.Authorization;
    console.log(req.cookies)
    if (!token) {
      res.status(401).json({
        message: "Authorization token missing",
        success: false,
      });
    }

    const decodedToken = verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as JwtPayload;

    if (!decodedToken?.email) {
      res.status(401).json({
        message: "Invalid token payload",
        success: false,
      });
    }

    const user = await userModel.findOne({
      email: decodedToken.email,
      isAdmin: true,
    });

    if (!user) {
      res.status(403).json({
        message: "Access denied. Admin privileges required.",
        success: false,
      });
    }

    next();
  } catch (error) {
    console.error("Error in adminMiddleware:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
});

export default adminMiddleware;
