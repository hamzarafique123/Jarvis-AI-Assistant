import mongoose from 'mongoose'
import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { generatToken } from './authToken.controller.js'

/**
 * - SignUp Controller
 * - /api/auth/signup
*/

const signUpController = async (req,res)=>{
    try {
        const { name , userName , password } = req.body;

        if(!name || !userName || !password){
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }
        
        // check if user already Exist or Not
        const isUser = await User.findOne({userName: userName.toLowerCase()});
        if(isUser) return res.status(400).json({
            success: false,
            message: 'user already Exist',
        });

        // user Not Exist then Password Hashed
        const hashedPassword = await bcrypt.hash(password,10);

        // After Hashed Password User Created
        const user = await User.create({
            name , userName:userName.toLowerCase() , password: hashedPassword
        })

        // generate Token
        const token = generatToken(user._id);
        res.cookie("token",token,{
            httpOnly:true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'strict',
            maxAge: 7*24*60*60*1000
        })
        // user.password = undefined
        return res.status(201).json({
            success:true,
            message:'user created',
            token,
            user
        })

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message:'Internal server Error'
        })
    }
}

/**
 * - LogIn Controller
 * - /api/auth/signup
*/

const logInController = async (req,res)=>{
    try {
        const { userName , password } = req.body;
        if(!userName || !password){
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }
        const isUser = await User.findOne({userName: userName.toLowerCase()}).select('+password');
        if(!isUser){
            return res.status(400).json({
                success: false,
                message: 'User Cannot Exist!'
            })
        }
        const isPassword = await bcrypt.compare(password,isUser.password)
        if(!isPassword){
            return res.status(400).json({
                success: false,
                message: 'Password is Incorrect'
            })
        }
        console.log(isUser);
        const token = generatToken(isUser._id);
        res.cookie("token",token,{
            httpOnly:true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'strict',
            maxAge: 7*24*60*60*1000
        })
        // isUser.password = undefined
        return res.status(200).json({
            success: true,
            message: 'Login Successfully',
            token,
            user: isUser
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'User cannot LogIn'
        })
    }
}

/**
 * - LogOut Controller
 * - /api/auth/signup
*/

const logOutController = async (req,res)=>{
    try {
        res.cookie("token","",{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'strict',
            expires: new Date(0) 
        })
        res.status(200).json({
            success:true,
            message: 'User successfully Logout',

        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "user Canot Logout"
        })
    }
}

export default {
    signUpController,
    logInController,
    logOutController,
}