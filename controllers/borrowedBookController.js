import Books from "../models/books.js";
import BorrowedBooks from "../models/borrowedBooks.js";
import User from "../models/user.js";

const borrowBook = async (req, res)=>{
    try {
        let {bookId, due_at} = req.body;

        let userId = req.user.id
        let existingUser = await User.findById(userId)

        let existingBook = await Books.findById(bookId)
        if (!existingBook) {
            return res.status(400).json({message:"Book does not exist"})
        }

        if (existingBook.status=='Borrowed') {
            return res.status(400).json({message:"Book is unavailable"})
        }

        existingBook.status = 'Borrowed'
        await existingBook.save();

        if (!bookId || !due_at) {
            return res.status(400).json({message:"All fields are required"})
        }

        let borrow = await BorrowedBooks.create({
            userId,
            bookId,
            borrowed_at: new Date(),
            due_at
        })

        // console.log(borrow)

        existingUser.booksBorrowed.push(borrow._id)
        await existingUser.save()

        res.status(201).json({message:"Book borrowed successfully"})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
}

const getAllBorrowedBooks = async (req, res)=>{
    try {
        let books = await BorrowedBooks.find();

        if (!books) {
            res.status(400).json({message:"No book found."})
        }

        res.status(200).json({books})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"})
    }
}




export{
    borrowBook,
    getAllBorrowedBooks
}