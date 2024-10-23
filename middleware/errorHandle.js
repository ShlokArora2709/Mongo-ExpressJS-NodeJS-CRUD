import exp from "../constants.js";

const errorHandler = (err,req,res,next)=>{
    const statusCode = res.statusCode?res.statusCode:500;
   switch(statusCode){
    case exp.VALIDATION_ERROR:
        res.status(statusCode).json({title: "validation error",message:err.message,stackTrace:err.stack});
        break;
   
    case exp.NOT_FOUND:
        res.status(statusCode).json({title: "not found",message:err.message,stackTrace:err.stack});
        break;
    
    case exp.UNAUTHORIZED:
        res.status(statusCode).json({title: "not authorized",message:err.message,stackTrace:err.stack});
        break;

    case exp.FORBIDDEN:
        res.status(statusCode).json({title: "forbidden",message:err.message,stackTrace:err.stack});
        break;
    
    case exp.SERVER_ERROR:
        res.status(statusCode).json({title: "Server error",message:err.message,stackTrace:err.stack});
        break;
    
    default:
        console.log("no error all good");
        
   }
}
export default errorHandler ;