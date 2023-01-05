import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    book_title: String,
    author: String,
    country: String,
    language: String,
    pages: Number,
    year: Number,
    imagelink: String,
    link: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
});

const BookModel = mongoose.model("books", bookSchema);
export default BookModel;

