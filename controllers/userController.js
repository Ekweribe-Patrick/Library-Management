import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserProfile from "../models/userProfile.js";

const createUser = async (req, res)=>{
    try {
       let {fullName, email, password} = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({message: "All fields are required."})

        }

        let hashedPassword = await bcrypt.hash(password,10)

        let user = await User.create({
            fullName,
            email,
            password: hashedPassword
        })

        res.status(201).json({message:"Sign up successful"})

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
}

const createUserProfile = async (req,res)=>{
    try {
        let {bio, dob} = req.body;
        let userId =  req.user.id;

        let existingUser = await User.findById(userId)

        if (existingUser.profile) {
            return res.status(400).json({message: "Profile already exist"})
        }

        if (!bio, !dob) {
            return res.status(400).json({message:"All fields required."})
        }


        let profile = await UserProfile.create({
            bio,
            dob,
            userId,
        })

        existingUser.profile = profile._id;
        await existingUser.save()

        res.status(201).json({message:"Profile created successfully"})

        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"})
    }
}

const getAllUsers = async (req, res)=>{
    try {
        let users = await User.find()

        if (!users) {
            res.status(400).json({message:"No user found"})
        }
        res.status(200).json({users})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"})
    }
}

const getOneUser = async (req, res)=>{
    try {
        let {id} = req.params;
        let user = await User.findById(id)

        if (!user) {
            res.status(400).json({message:"User not found"})
        }
        res.status(200).json({user})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
}

const deleteOneUser = async (req, res)=>{
   try {
        let {id} = req.params
        let user = await User.findByIdAndDelete(id)

        if (!user) {
            res.status(400).json({message:"User not found"})
        }
        res.status(200).json({message:"User deleted successfully"})

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
}

const updateOneUser = async (req, res)=>{
    try {
        let {id} = req.params;
        let update = req.body;
        let user = await User.findByIdAndUpdate(id, update, {new:true})

        if (!user) {
            res.status(400).json({message:"User not found"})
        }

        res.status(200).json({message:"User updated successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
}

let login = async (req, res)=>{
    try {
        let {email, password} = req.body;

        if (!email || !password) {
            res.status(400).json({message:"All fields are required"})
        }

        let checkEmail = await User.findOne({email})
        if (!checkEmail) {
            res.status(400).json({message:"Invalid email address"})
        }

        let checkPassword = await bcrypt.compare(password, checkEmail.password)
        if (!checkPassword) {
            res.status(400).json({message:"Invalid password"})
        }

         let token = jwt.sign(
            {id: checkEmail._id, role: checkEmail.role},
            process.env.SECRETKEY,
            {expiresIn: "1hr"}
        );

        res.cookie('token',token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 1000 
        })


        res.status(200).json({message:"Login successful"})

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
}
export{
    createUser,
    createUserProfile,
    getAllUsers,
    getOneUser,
    deleteOneUser,
    updateOneUser,
    login
}