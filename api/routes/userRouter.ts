import express from "express";
import userController from "../controller/userController";
import { authMiddleware } from "../middleware/authMiddleware";

const userRouter = express.Router();

userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);
userRouter.get("/logout", authMiddleware, userController.logout);

userRouter.get("/refresh", userController.refresh);

export default userRouter;
