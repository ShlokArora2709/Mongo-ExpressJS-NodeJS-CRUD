import mongoose from "mongoose"

const contactSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true,"please add contact name"]    
    },
    email:{
        type: String,
        required: [true,"please add contact email"]    
    },
    name:{
        type: String,
        required: [true,"please add contact number"]    
    }
},{
    timestamps:true,
});
export default mongoose.model("Contact",contactSchema);
