import express from "express";
import adminMiddleware from "../middleware/adminMiddleware";
import { connectDb } from "../db";
import userModel from "../models/userModels";

const adminController = express.Router();

adminController.get("/users", adminMiddleware, async (req, res) => {
  await connectDb();

  try {
    const users = await userModel.find(
      { isAdmin: false },
      {
        name: true,
        email: true,
        createdAt: true,
      }
    );

    res.status(200).json({
        message : "Fetch success",
        success : true,
        users
    })


  } catch (error) {
    res.status(500).json({
        message : "Soemthing went wrong!",
        success : false
    })
  }
});

export default adminController;