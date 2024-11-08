import UserModel from "../model/UsersModel.js";

export const registration = async (req, res) => {
    try{
        let reqBody = req.body;

        await UserModel.create(reqBody);
        res.json({status: "success", message: "User registered successfully"});
    }catch(err){
        res.json({status: "error", error: err});
    }
}
export const login = (req, res) => {

}
export const logOut = (req, res) => {

}
export const profileUpdate = (req, res) => {

}
export const profileDetails = (req, res) => {

}
export const verifyEmail = (req, res) => {

}
export const verifyOTP = (req, res) => {

}
export const passwordReset = (req, res) => {

}