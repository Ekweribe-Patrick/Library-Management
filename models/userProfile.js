import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userProfileSchema = new Schema ({
    bio: {
        type: String,
        required: true
    },

    dob: {
        type: String,
        required: true,
    },
    
    profilePic: {
        type: String,
        default: null
    },

    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        unique: true
    }
},{timestamps: true});


const UserProfile = mongoose.model("UserProfile", userProfileSchema);

export default UserProfile;