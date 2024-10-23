import express from "express";
import { configDotenv } from "dotenv";
import contactRoutes from '../mycontacts-backend/routes/contackRoutes.js';
import errorHandle from "./middleware/errorHandle.js";
import errorHandler from "./middleware/errorHandle.js";
configDotenv();
const port = process.env.PORT || 5000;

const app=express();
app.use(express.json());
app.use("/api/contacts/", contactRoutes);
app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`listning on ${port}`);
});

