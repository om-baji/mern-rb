import express from "express";
import alreadyLogged from "../middleware/alreadyLogged";
import userController from "../controller/authController";
import requireAuth from "../middleware/requireAuth";
import adminMiddleware from "../middleware/adminMiddleware";
import adminController from "../controller/adminController";

const userRouter = express.Router();

userRouter.post("/signup", alreadyLogged,userController.signup as any)
userRouter.post("/login",alreadyLogged,userController.login as any)

userRouter.get("/profile", requireAuth, userController.profile)

userRouter.get("/users", adminMiddleware, adminController.getUsers)

export default userRouter;