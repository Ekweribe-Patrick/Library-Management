import mongoose from "mongoose";
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    fullName:{
        type: String,
        required: true
    },

    bio:{
        type: String,
        required: false
    },

    birthDate:{
        type: Date,
        required: false
    },

    booksWritten:[{
        type: mongoose.Types.ObjectId,
        ref:"Books"
    }]
}, {timestamps:true})


const Author = mongoose.model("Author", authorSchema)
export default Author 