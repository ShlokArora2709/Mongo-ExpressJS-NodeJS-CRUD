import expressAsyncHandler from "express-async-handler";
import userModel from "../models/userModel.js";
import pkg from "bcryptjs";
const {hash}=pkg;

const registerUser = expressAsyncHandler(async (req, res) => {
    const {username,email,password} =req.body;
    if(!username || !email ||!password){
        res.status(400);
        throw new Error("Please fill all details");
    }
    const userAvail = await userModel.findOne({email});
    if (userAvail){
        res.status(400);
        throw new Error("user Already registered");
    }
    const hashPass =await hash(password,10);
    //console.log(hashPass);
    const user = await userModel.create({
        username,
        email,
        password:hashPass
    });
    console.log(user);
    if(user){
        res.status(201).json({_id:user._id,email:user.email})
    }
    else{
        res.status(400)
        throw new Error("response not valid") 
    }
});

const loginUser = expressAsyncHandler(async (req, res) => {

    res.json({ message: "login the user" });
});

const currentUser = expressAsyncHandler(async (req, res) => {
    res.json({ message: "user info" });
});

export default {registerUser,loginUser,currentUser};