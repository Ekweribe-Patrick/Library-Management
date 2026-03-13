import Author from "../models/author.js";

const createAuthor = async (req, res)=>{
    try {
       let {fullName, bio, birthdate} = req.body;

        if (!fullName) {
            return res.status(400).json({message: "All fields are required."})

        }


        let user = await Author.create({
            fullName,
            bio,
            birthdate,
            booksWritten
        
        })

        res.status(201).json({message:"Author registered successfully"})

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
}

const getAllAuthors = async (req, res)=>{
    try {
        let authors = await Author.find()

        if (!authors) {
            res.status(400).json({message:"No author found"})
        }
        res.status(200).json({authors})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"})
    }
}

const getOneAuthor = async (req, res)=>{
    try {
        let {id} = req.params;
        let author = await Author.findById(id)

        if (!author) {
            res.status(400).json({message:"Author not found"})
        }
        res.status(200).json({author})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
}

const deleteOneAuthor = async (req, res)=>{
   try {
        let {id} = req.params
        let author = await Author.findByIdAndDelete(id)

        if (!author) {
            res.status(400).json({message:"Author not found"})
        }
        res.status(200).json({message:"Author deleted successfully"})

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
}

const updateOneAuthor = async (req, res)=>{
    try {
        let {id} = req.params;
        let update = req.body;
        let author = await Author.findByIdAndUpdate(id, update, {new:true})

        if (!author) {
            res.status(400).json({message:"Author not found"})
        }

        res.status(200).json({message:"Author updated successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
}

export{
    createAuthor,
    getAllAuthors,
    getOneAuthor,
    deleteOneAuthor,
    updateOneAuthor
}