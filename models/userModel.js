import mongoose, { mongo } from "mongoose"

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "please add the user"],
    },
    email: {
        type: String,
        required: [true, "please add the email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "please add the password"],
    }
}, {
    timestamps: true
});

export default mongoose.model("User",userSchema);