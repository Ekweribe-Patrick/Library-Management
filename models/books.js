import mongoose from "mongoose";
const Schema = mongoose.Schema;


const bookSchema = new Schema({
    title:{
        type: String,
        required: true
    },

    isbn:{
        type: String,
        required: true,
        unique: true
    },

    published_date:{
        type: Date,
        required:true
    
    },

    authorId: {
        type: mongoose.Types.ObjectId,
        ref: "Author",
        unique: true
    },

    status:{
        type: String,
        enum: ["Available", "Borrowed"],
        default: "Available",
        required: true
    }


}, {timestamps:true});

const Books = mongoose.model("Books", bookSchema);
export default Books