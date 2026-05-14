import express from 'express'
import authController from '../controllers/auth.controller.js';
const userRouter = express.Router();

//  ==========  SignUp Router ==========
userRouter.route('/register').post(authController.signUpController)
//  ==========  LogIn Router ==========
userRouter.route('/login').post(authController.logInController)
//  ==========  LogOut Router ==========
userRouter.route('/logout').post(authController.logOutController)

export default userRouter