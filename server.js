import express from "express";
import { configDotenv } from "dotenv";
import connection from "./config/dbConnection.js";
import contactRoutes from '../mycontacts-backend/routes/contackRoutes.js';
import userRoutes from "../mycontacts-backend/routes/userRoutes.js"
import errorHandler from "./middleware/errorHandle.js";
configDotenv();
connection();
const port = process.env.PORT || 5000;

const app=express();
app.use(express.json());
app.use("/api/contacts/", contactRoutes);
app.use("/api/user/", userRoutes);
app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`listning on ${port}`);
});

