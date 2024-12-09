import { type Request, type Response } from "express";
import { connectDb } from "../db";
import userModel from "../models/userModels";

class AdminController {

    private static adminController : AdminController;

    static getInstance() {
      if(!AdminController.adminController) {
        AdminController.adminController = new AdminController()
      }

      return AdminController.adminController;
    }

    async getUsers(req : Request ,res : Response) {
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
    }
}

const adminController = AdminController.getInstance();

export default adminController;