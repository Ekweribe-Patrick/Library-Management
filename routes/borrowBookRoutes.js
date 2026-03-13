import express from "express"
import { borrowBook, getAllBorrowedBooks } from "../controllers/borrowedBookController.js";
import authorize from "../middlewares/authorize.js";
import { returnBook } from "../controllers/historyController.js";
const router = express.Router();

router.post('/borrowBook/:id', authorize(["user"]), borrowBook);
router.get('/', authorize(["admin", "liberian"]), getAllBorrowedBooks)

router.post('/returnBook', authorize(["user"]), returnBook)

export default router