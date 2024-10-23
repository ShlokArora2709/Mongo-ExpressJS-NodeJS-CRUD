import expressAsyncHandler from "express-async-handler";



const getContact = expressAsyncHandler(async (req, res) => {
    res.status(200).json({ message: "get all" });
});

const postContact =expressAsyncHandler(async (req,res,next)=>{
    console.log(req.body);
    const { name,email,phone}=req.body;
    if(!name || !email || !phone){
        const err= new Error("error no data");
        res.status(400);
        return next(err);
        
    }
    res.status(201).json({message:"create new"})
});

const getSpecific = expressAsyncHandler(async (req,res)=>{
    res.status(200).json({message:"get specific"})
});

const updateContact = expressAsyncHandler (async (req,res)=>{
    res.status(200).json({message:`updated ${req.params.id}`})
});

const deleteContact = expressAsyncHandler(async (req,res)=>{
    res.status(200).json({message:`deleted ${req.params.id}`})
});

export default { getContact, postContact, updateContact, getSpecific, deleteContact };
