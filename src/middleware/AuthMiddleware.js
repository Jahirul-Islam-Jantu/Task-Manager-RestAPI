import {DecodeToken} from "../utility/JWTTokenHelper.js";
export const AuthMiddleware = (req, res, next) => {
    let token = req.headers["token"];
    let decodeToken = DecodeToken(token);

    if (!decodeToken) { // Check if decoding failed
        res.status(401).json({ error: "Invalid or expired token" });
    } else {
        req.headers.email = decodeToken.email; // directly assign email
        next();
    }
};
// import error from "jsonwebtoken/lib/JsonWebTokenError.js";
//
// export const AuthMiddleware =  (req, res, next) => {
//     let token = req.headers["token"]
//     let decodeToken = DecodeToken(token)
//     if (error){
//         res.status(401).json({error: error.message})
//     }else{
//         let email = decodeToken.user[0].email;
//         console.log(req.headers.email = email)
//         // req.headers.email = email
//         next()
//     }
// }

