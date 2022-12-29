import User from "../models/userModel.js"
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
export const registerRoute = async (req, res) => {
    try {
        const registrationData = req.body;
        const newPassword = await bcrypt.hash(req.body.password, 10);
        const encryptedData = {...registrationData, password : newPassword}
        const registeredData = new User(encryptedData);
        await registeredData.save();
        res.status(200).json({success : true, data : registeredData, message : "User Registered Successfully.."})
    } catch (error) {
        res.status(400).send(error);
    }
}


export const loginRoute = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email : email});
        if(!user){
            return res.status(400).json({success : false, message :`The user for the ${email} id not Registered`})
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(isPasswordValid){
            const token = jwt.sign({name : user.name, email : user.email}, process.env.KEY);
            return res.status(200).json({success : true, token : token, message : "User Login Successfully"})
        }
        else{
            return res.status(400).json({success : false, message : "Invalid Password"})
        }
    } catch (error) {
        res.status(400).send(error);
    }
}


export const getContentRoute = async (req, res) => {
    const token = req.headers["x-access-token"];
    console.log(token);
    try {
        const decoded = jwt.verify(token, process.env.KEY);
        const email = decoded.email;
        const user = await User.findOne({email : email});
        console.log(user);
        res.status(200).json({success : true, content : user.content, message : "Content get Successfully"})
    } catch (error) {
        res.status(400).json({success : false, message : "The content was not updated"})
    }
}


export const postContentRoute = async (req, res) => {
    const token = req.headers["x-access-token"]; // const headers = { x-access-token: "jwt_generated_token"}
    console.log(token);
    try {
      const decoded = jwt.verify(token, process.env.KEY);
      console.log(decoded); // { "name": "", "email": "", }
      const email = decoded.email;
      const { content } = req.body;
      await User.updateOne({ email: email }, { $set: { content: content } });
      return res
        .status(200)
        .json({ success: true, msg: "Content added successfully", content : content });
    } catch (error) {
      res.status(400).json({ success: false, msg: "Invalid jwt token" });
    }
    
}
