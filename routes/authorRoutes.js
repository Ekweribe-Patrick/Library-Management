import express from "express"
import { createAuthor, deleteOneAuthor, getAllAuthors, getOneAuthor, updateOneAuthor } from "../controllers/authorController.js";
import authorize from "../middlewares/authorize.js";
const router = express.Router();

router.post('/register', authorize(["admin", "liberian"]), createAuthor)
router.get('/', getAllAuthors)
router.get('/:id', getOneAuthor)
router.delete('/:id',authorize(["admin", "liberian"]), deleteOneAuthor)
router.put('/:id',authorize(["admin", "liberian"]), updateOneAuthor)


export default router