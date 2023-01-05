import express from "express";
import dotenv from "dotenv";
import {
    getAllBooks,
    getBooksByAuthor,
    //getOneBook,
    addNewBook,
    modifyBook,
    removeBook
} from "../controllers/BookController.js";

dotenv.config();

import auth from "../passportMiddleware.js";

const router = express.Router();

router.get("/", auth, getAllBooks);
router.get("/", auth, getBooksByAuthor);
//router.get("/id", getOneBook);
router.post("/", auth, addNewBook);
router.put("/", auth, modifyBook);
router.delete("/", auth, removeBook);

export default router;
