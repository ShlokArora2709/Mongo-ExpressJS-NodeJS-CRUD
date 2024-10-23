import express from "express";
import { configDotenv } from "dotenv";
import contactRoutes from '../mycontacts-backend/routes/contackRoutes.js';
configDotenv();
const port = process.env.PORT || 5000;

const app=express();
app.use("/api/contacts/", contactRoutes);

app.listen(port, ()=>{
    console.log(`listning on ${port}`);
});

