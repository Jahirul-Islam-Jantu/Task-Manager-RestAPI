import {DecodeToken} from "../utility/JWTTokenHelper.js";
import error from "jsonwebtoken/lib/JsonWebTokenError.js";

export const AuthMiddleware = (req, res, next) => {
    let token = req.headers["token"]
    let decodeToken = DecodeToken(token)
    if (error){
        res.status(401).json({error: error.message})
    }else{
        let email = decodeToken.email;
        req.headers.email = email
        next()
    }
}