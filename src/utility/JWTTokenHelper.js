import jwt from "jsonwebtoken";
import {JWT_Secret,  JWT_Expires} from "../config/config.js";


export const EncodeToken = (email, user_id) => {
    const KEY = JWT_Secret
    const EXPIRE = {expiresIn: JWT_Expires}
    const PAYLOAD = {email: email, user_id: user_id}
    return jwt.sign(PAYLOAD, KEY, EXPIRE)
}

export const DecodeToken = (token) => {
    try {
        const KEY = JWT_Secret; // Use JWT_Secret consistently
        return jwt.verify(token, KEY);
    } catch (err) {
        return null;
    }
};
