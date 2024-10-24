import expressAsyncHandler from "express-async-handler";
import contactModel from "../models/contactModel.js";


const getContact = expressAsyncHandler(async (req, res) => {
    const contact = await contactModel.find();
    res.status(200).json(contact);
});

const postContact =expressAsyncHandler(async (req,res,next)=>{
    console.log(req.body);
    const { name,email,phone}=req.body;
    if(!name || !email || !phone){
        const err= new Error("error no data");
        res.status(400);
        return next(err);
        
    }

    const contact = await contactModel.create({
        name,email,phone
    })
    res.status(201).json({contact})
});

const getSpecific = expressAsyncHandler(async (req,res)=>{
    const contact = await contactModel.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not found")
    }
    res.status(200).json(contact)
});

const updateContact = expressAsyncHandler (async (req,res)=>{
    const contact = await contactModel.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not found");
    }
    const newData = await contactModel.findByIdAndUpdate(req.params.id,req.body);
    res.status(200).json(newData);

});

const deleteContact = expressAsyncHandler(async (req,res)=>{
    const contact = await contactModel.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not found");
    }
    await contactModel.deleteOne({_id:req.params.id});
    res.status(200).json(contact);
});

export default { getContact, postContact, updateContact, getSpecific, deleteContact };
