import mongoose from "mongoose";
import { type } from "os";
const Schema = mongoose.Schema;

const borrowedBookSchema = new Schema({

    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    
    bookId: {
        type: mongoose.Types.ObjectId,
        ref: "Books",
        unique: true
    },

    borrowed_at:{
        type: Date,
        default: Date.now,
        required: true
    },

    due_at:{
        type: Date,
        required: true
    },

    returned_at:{
        type: Date,
    }
})

const BorrowedBooks = mongoose.model("BorrowedBooks", borrowedBookSchema);
export default BorrowedBooks