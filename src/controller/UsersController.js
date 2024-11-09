import UserModel from "../model/UsersModel.js";
import {EncodeToken} from "../utility/JWTTokenHelper.js";
import {EmailSend} from "../utility/EmailUtility.js";
import OTPModel from "../model/OTPModel.js";

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
export const profileUpdate = async (req, res) => {
    try{
        let email = req.headers['email']
        let reqBody = req.body;
        await UserModel.updateOne({email: email}, reqBody)
        res.json({status: "success", message: "User updated successfully"});
    }catch(err){
        res.json({status: "error", error: err});
    }
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

export const verifyEmail = async (req, res) => {
    try{
        let {email} = req.params

        let user = await UserModel.find({email: email})
        if(user.length > 0){
            let otp = Math.floor(Math.random()*100000 + 900000);
            let subject = "Password reset"
            let text = `Your password reset code is ${otp} . Please don't share this password with anyone.`
            await EmailSend(email, subject, text)
            await OTPModel.create({email: email, otp: otp, status: "success"})
            res.json({status: "success", message: "OTP sent on Email successfully"});
        }
    }
    catch (err) {
        console.error(err);
        res.json({ status: "error", error: err.message });
    }
}
export const verifyOTP = async (req, res) => {
    try{
        let {email, otp} = req.params
        let user = await OTPModel.find({email: email, otp: otp, status: "success"})
        if(user.length > 0){

            await OTPModel.updateOne({email: email, otp: otp}, {status: "verified"})
            res.json({status: "success", message: "OTP Verified"});
        }
    }
    catch (err) {
        console.error(err);
        res.json({ status: "error", error: err.message });
    }
}
export const passwordReset =async (req, res) => {
    try{
        let {email, otp, password} = req.params
        let user = await OTPModel.find({email: email, otp: otp, status: "verified"})
        if(user.length > 0){

            await OTPModel.deleteOne({email: email, otp: otp})
            await UserModel.updateOne({email: email}, {password: password})
            res.json({status: "success", message: "Password reset successfully"});
        }
    }
    catch (err) {

        res.json({ status: "error", error: err.message });
    }
}
export const logOut = (req, res) => {

}
