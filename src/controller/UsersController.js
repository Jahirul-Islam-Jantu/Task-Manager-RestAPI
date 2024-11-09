import UserModel from "../model/UsersModel.js";
import {EncodeToken} from "../utility/JWTTokenHelper.js";

export const registration = async (req, res) => {
    try{
        let reqBody = req.body;

        await UserModel.create(reqBody);
        res.json({status: "success", message: "User registered successfully"});
    }catch(err){
        res.json({status: "error", error: err});
    }
}
export const login = async (req, res) => {
    try{
        let reqBody = req.body;
        let user = await UserModel.find(reqBody)
        if (user.length>0){
            const token = EncodeToken(user[0].email, user[0]._id);
            res.json({status: "success", message: "User registered successfully", token: token });

        }else{
            res.json({status: "failed", message: "User not found"});
        }


    }catch(err){
        res.json({status: "error", error: err});
    }
}
export const logOut = (req, res) => {

}
export const profileUpdate = (req, res) => {

}
export const profileDetails = async (req, res) => {
    try{
        let email = req.headers['email']
        let user = await UserModel.find({email: email})
        res.json({status: "success", data: user});
    }catch(err){
        res.json({status: "error", error: err});
    }
}
export const verifyEmail = (req, res) => {

}
export const verifyOTP = (req, res) => {

}
export const passwordReset = (req, res) => {

}