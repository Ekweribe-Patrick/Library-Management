import mongoose from "mongoose";
const Schema = mongoose.Schema;


const userSchema = new Schema({
    fullName:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true,
        unique: true
    },

    password:{
        type: String,
        required: true
    },

    profile: {
        type: mongoose.Types.ObjectId,
        ref: "Userprofile",
        default:null
    },

    role:{
        type: String,
        enum: ["admin", "liberian", "user"],
        default: "user"
    },

    booksBorrowed:[{
        type: mongoose.Types.ObjectId,
        ref: "BorrowedBooks",
    }]
},{timestamps:true});

const User = mongoose.model("User", userSchema);
export default User