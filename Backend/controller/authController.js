import bcrypt from "bcrypt"
import User from "../Models/authModel.js";
import jwt from "jsonwebtoken"

const register = async(req, res)=>{
    try {
        const {username, email, password} = req.body;

        if(!username || !email || !password){
            return res.status(400).json({success: false, message: "All fields are require."})
        }

        const emailExist = await User.findOne({email}); 

        if(emailExist){
            return res.status(400).json({success: false, message: "Email already exist"})
        }

        if(password.length < 8){
            return res.status(400).json({success: false, message: "Password must be more than 8"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create({
            username, email, password: hashPassword 
        })

        return res.status(201).json({success: true, message: "Successfully Register"})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({success: false, message: "Internal Server error"})
    }
}

const login = async(req, res)=>{
    try {
        const {email, password} = req.body;

        if(!email, !password){
            return res.status(400).json({success: false, message: "All fields are required"});
        }

        const user = await User.findOne({email})

        if(!user){
            return res.status(404).json({success: false, message: "Email not found"})
        }

        const isMatchPass = await bcrypt.compare(password, user.password)

        if(!isMatchPass){
            return res.status(400).json({success: false, message: "Invalid Email or password"})
        }

        const token = jwt.sign({id: user._id}, process.env.AUTH_TOKEN, {
            expiresIn: "2h"
        })

        return res.status(200).json({success: true, username: user.username,  token, message: "Successfully login"})

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({success: false, message: "Internal Server error"})
    }
}


export {register, login}