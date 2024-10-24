import expressAsyncHandler from "express-async-handler";
import pkg from "jsonwebtoken";

const {verify} =pkg

const validateToken = expressAsyncHandler(async(req,res,next) => {
    let token;
    let authHeader=req.headers.authorization || req.headers.Authorization;
    if (authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        verify(token,process.env.ACCESS_TOKEN,(err,decoded)=>{
            if (err){
                res.status(401)
                throw new Error("User not authorized");  
            }
            req.user=decoded.user;
            next();
            
        });
        if(!token){
            res.status(401)
            throw new Error("user not authorzed or token missing")
        }
    }
});

export default validateToken;