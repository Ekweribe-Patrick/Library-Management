import express from "express";
import { createBook, deleteOneBook, getAllBooks, getOneBook, updateOneBook } from "../controllers/bookController.js";
import authorize from "../middlewares/authorize.js";
const router = express.Router();

router.post('/register', authorize(["admin", "liberian"]), createBook)
router.get('/',  getAllBooks)
router.get('/:id', getOneBook)
router.delete('/:id', authorize(["admin"]), deleteOneBook)
router.put('/:id', authorize(["admin", "liberian"]), updateOneBook)

export default router