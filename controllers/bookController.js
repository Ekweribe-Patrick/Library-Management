import Books from "../models/books.js";
import Author from "../models/author.js";


const createBook = async (req, res)=>{
    try {
       let {title, isbn, published_date, authorId} = req.body;

       let existingAuthor = await Author.findById(authorId);

        if(!existingAuthor){ 
            return res.status(400).json({message:"Author doesn't exist"});
        }
        if (!title || !isbn || !published_date || !authorId) {
            return res.status(400).json({message: "All fields are required."})
        }


        let book = await Books.create({
            title,
            isbn, 
            published_date,
            authorId
        
        })

        existingAuthor.booksWritten.push(book._id)
        await existingAuthor.save()

        res.status(201).json({message:"Book registered successfully"})

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
}

const getAllBooks = async (req, res)=>{
    try {
        let books = await Books.find()

        if (!books) {
            res.status(400).json({message:"No book found"})
        }
        res.status(200).json({books})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"})
    }
}

const getOneBook = async (req, res)=>{
    try {
        let {id} = req.params;
        let book = await Books.findById(id)

        if (!book) {
            res.status(400).json({message:"Book not found"})
        }
        res.status(200).json({book})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
}

const deleteOneBook = async (req, res)=>{
   try {
        let {id} = req.params
        let book = await Books.findByIdAndDelete(id)

        if (!book) {
            res.status(400).json({message:"Book not found"})
        }
        res.status(200).json({message:"Book deleted successfully"})

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
}

const updateOneBook = async (req, res)=>{
    try {
        let {id} = req.params;
        let update = req.body;
        let book = await Books.findByIdAndUpdate(id, update, {new:true})

        if (!book) {
            res.status(400).json({message:"Book not found"})
        }

        res.status(200).json({message:"Book updated successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
}

export{
    createBook,
    getAllBooks,
    getOneBook,
    deleteOneBook,
    updateOneBook
}