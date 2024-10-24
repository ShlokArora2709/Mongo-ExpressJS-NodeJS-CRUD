import expressAsyncHandler from "express-async-handler";
import userModel from "../models/userModel.js";
import pkg from "bcryptjs";
import pkg1 from "jsonwebtoken";
const {hash,compare}=pkg;
const {sign} =pkg1;

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
    const {email,password}=req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("Fill of credentials");
    }
    const user = await userModel.findOne({email});
    if(user && await compare(password,user.password)){
        const accessToken = sign({
            user:{
                username:user.username,
                email:user.email,
                id: user.id
            }
        },process.env.ACCESS_TOKEN,
    {expiresIn:"50m"})
        res.status(200).json({accessToken});
    }else{
        res.status(401)
        throw new Error("email or password is not valid")
    }
});

const currentUser = expressAsyncHandler(async (req, res) => {
    res.json(req.user);
});

export default {registerUser,loginUser,currentUser};