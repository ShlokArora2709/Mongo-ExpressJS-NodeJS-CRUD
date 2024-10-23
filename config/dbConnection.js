import mongoose from "mongoose";

const connection =async ()=>{
    try{
        const connect = await mongoose.connect(process.env.MONGO_DB_CONNECTION);
        console.log("connected",connect.connection.host,connect.connection.name)
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}

export default connection;