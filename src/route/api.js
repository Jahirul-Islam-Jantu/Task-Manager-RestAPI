import express from 'express';
const router = express.Router();
import * as userController from '../controller/UsersController.js';

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.post("/profileUpdate", userController.profileUpdate);
router.post("/verifyEmail/:email", userController.verifyEmail);
router.get("/verifyOTP/:email/:otp", userController.verifyOTP);
router.get("/passwordReset/:email/:otp/:password", userController.passwordReset);





export default router;