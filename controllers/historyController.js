import Books from "../models/books.js";
import BorrowedBooks from "../models/borrowedBooks.js";
import BorrowedBookHistory from "../models/history.js";
import User from "../models/user.js";


const returnBook = async (req, res)=>{
    try {
       let {bookId}= req.body;
       let userId = req.user.id

       
       if (!bookId) {
        return res.status(400).json({message:"All fields are required"})
        
       }
       let existingUser = await User.findById(userId)
       if (!existingUser) {
        return res.status(400).json({message:"User not found"})
}
       let existingBook = await Books.findById(bookId);


       if (!existingBook) {
        return res.status(400).json({message:"Book not found"})
       }
    
       existingBook.status = 'Available'
       await existingBook.save(); 

       

       let borrowRecord = await BorrowedBooks.findOne({bookId, userId})
       if (!borrowRecord) {
        return res.status(400).json({message:"Record not found."})
       }

       let historyRecord = await BorrowedBookHistory.create({
        userId: borrowRecord.userId,
        bookId: borrowRecord.bookId,
        borrowed_at: borrowRecord.borrowed_at,
        due_at: borrowRecord.due_at,
        returned_at: new Date()
       })
    //    await historyRecord.save();

       await BorrowedBooks.findByIdAndDelete(borrowRecord._id)

       existingUser.booksBorrowed.pull(borrowRecord._id);
       await existingUser.save();

       return res.status(201).json({message:"Book returned successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
}

export {
    returnBook
}