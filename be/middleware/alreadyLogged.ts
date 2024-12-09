import express, { type NextFunction } from "express";
import { verify, type JwtPayload } from "jsonwebtoken";

const alreadyLogged = express.Router();

alreadyLogged.use((req, res, next : NextFunction) => {
    try {
        const token = req.cookies?.Authorization;
        
        if (!token || token.length == 0) {
            return next(); 
        }

        const decoded = verify(token, process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload;

        if (decoded) {
            res.status(200).json({
                message: "Already logged in!",
                success: true,
            });
        }

        next();
    } catch (error) {
        console.log("Token expired", error)
        next();
    }
});

export default alreadyLogged;
