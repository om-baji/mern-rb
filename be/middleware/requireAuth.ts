import express from "express"
import { verify, type JwtPayload } from "jsonwebtoken"

const middleware = express.Router()

middleware.use(async (req,res,next) => {

    const token = req.cookies
    
    const isValid = await verify(token.Authorization, process.env.ACCESS_TOKEN_SECRET as string)

    console.log(isValid)

    if(!isValid) res.status(411).json({
        message : "Unauthorized"
    })

    req.body.mail = (isValid as JwtPayload).email

    next()

})

export default middleware;