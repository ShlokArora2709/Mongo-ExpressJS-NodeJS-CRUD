import mongoose from "mongoose";
/**
 * Establishes a connection to the MongoDB database using Mongoose.
 * If successful, logs the connection host and database name.
 * If the connection fails, logs the error and exits the process with a failure code.
 */
const connection =async ()=>{
    try{
        // Attempt to connect to the MongoDB instance using the connection string from environment variables.
        const connect = await mongoose.connect(process.env.MONGO_DB_CONNECTION);
        console.log("connected",connect.connection.host,connect.connection.name)
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}

export default connection;