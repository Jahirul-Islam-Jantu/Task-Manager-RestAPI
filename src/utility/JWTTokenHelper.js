import {JWT_EXPIRATION_DURATION, JWT_SECRET} from "../config/config.js";
import jwt from "jsonwebtoken";

export const EncodeToken = (email, user_id) => {
    const KEY = JWT_SECRET
    const EXPIRE = {expiresIn: JWT_EXPIRATION_DURATION}
    const PAYLOAD = {email: email, user_id: user_id}
    return jwt.sign(PAYLOAD, KEY, EXPIRE)
}

export const DecodeToken = (token) => {
    try{
        const KEY = JWT_SECRET
        return jwt.verify(token, KEY)
    }catch(err){
        return null
    }
}