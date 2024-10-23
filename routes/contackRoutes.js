import express from "express";
const router = express.Router();

router.route("/").get((req,res)=>{
    res.json({message:"get all"})
})
router.route("/").post((req,res)=>{
    res.json({message:"create new"})
})
router.route("/:id").get((req,res)=>{
    res.json({message:"get specific"})
})
router.route("/:id").put((req,res)=>{
    res.json({message:`updated ${req.params.id}`})
})
router.route("/:id").delete((req,res)=>{
    res.json({message:`deleted ${req.params.id}`})
})
export default router;