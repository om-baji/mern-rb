import { sign } from "jsonwebtoken"

export const generateAccessToken = async (id : string) => {
    const accessToken = sign({id}, process.env.ACCESS_TOKEN_SECRET as string, {
        expiresIn : "30m"
    })
    return accessToken;
}

export const generateRefreshToken = async (id : string) => {
    const refreshToken = sign({id}, process.env.REFRESH_TOKEN_SECRET as string, {
        expiresIn : "7d"
    })
    return refreshToken;
}

