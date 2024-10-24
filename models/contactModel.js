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
    phone:{
        type: String,
        required: [true,"please add contact number"]    
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    }
},{
    timestamps:true,
});
export default mongoose.model("Contact",contactSchema);
