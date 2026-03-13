import express from "express";
import { createUser, createUserProfile, deleteOneUser, getAllUsers, getOneUser, login, updateOneUser } from "../controllers/userController.js";
import authorize from "../middlewares/authorize.js";
const router = express.Router();

router.post('/register', createUser)
router.post('/userProfile', authorize(["admin", "liberian", "user"]), createUserProfile)
router.post('/login', login)
router.get('/', getAllUsers)
router.get('/:id', authorize(["admin", "liberian"]), getOneUser)
router.delete('/:id', authorize(["admin"]), deleteOneUser)
router.put('/:id', authorize(["admin"]), updateOneUser)


export default router