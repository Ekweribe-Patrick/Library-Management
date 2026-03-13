import mongoose from "mongoose";
const Schema = mongoose.Schema;

const borrowedbookHistorySchema = new Schema({
    userId:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },

    bookId:{
        type: mongoose.Types.ObjectId,
        ref: "Books",
        required: true
    },
    borrowed_at:{
        type: String,
        required: true
    },

    due_at:{
        type: String,
        required: true
    },

    returned_at:{
        type: Date,
        default: Date.now
    }
}, {timestamps: true});

const BorrowedBookHistory = mongoose.model('BorrowedBookHistory', borrowedbookHistorySchema);
export default BorrowedBookHistory;