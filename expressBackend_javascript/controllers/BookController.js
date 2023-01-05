import BookModel from "../models/BookModel.js";
import UserModel from "../models/UserModel.js";


export const getAllBooks = async (req, res) => {
    const allBooks = await BookModel.find();
    res.json(allBooks);
};

export const getBooksByAuthor = async (req, res) => {
    try {
        const booksByAuthor = await BookModel.find({ author: req.body.author });
        res.json(booksByAuthor);
    } catch (e) {
        res.send(`Books by author ${req.body.author} were not found`)
    };
};

export const getOneBook = async (req, res) => {
    try {
        const selectedBook = await BookModel.findOne({ _id: req.body._id })
        res.json(selectedBook);
    } catch (e) {
        console.log("selected book: ", e);
        res.status(400).json({ message: "bad request" });
    };

};

export const addNewBook = async (req, res) => {
    try {
        const user = await UserModel.findOne({ user_name: req.user.user });
        const newBook = new BookModel(req.body);
        newBook.userId = user._id.toString();
        
        const savedBook = await newBook.save();
        res.send(`Book saved to database: ${savedBook}`)

    } catch (e) {
        res.status(400).json({ message: "error in data format" });
    }
};

export const modifyBook = async (req, res) => {
    const user = await UserModel.findOne({ user_name: req.user.user });    
    const book = await BookModel.findOne({ _id: req.body._id });  
    console.log(book);
     

    if (user._id.toString() === book.userId.toString()) {
        const update = { ...req.body };
        try {
            const updatedBook = await BookModel.findOneAndUpdate({ _id: req.body.id }, update);
            res.send("success");
        } catch (e) {
            console.log("updated book   : ", e);
            res.status(400).json({ message: "bad request" });
        }
    } else {
        res.send("error")

    }
};

export const removeBook = async (req, res) => {
    const user = await UserModel.findOne({ user_name: req.user.user });     
    const book = await BookModel.findOne({ _id: req.body.id });
   
    if (user._id.toString() === book.userId.toString()) {
        try {
            const bookRemoved = await BookModel.findOneAndDelete({ _id: req.body.id });
            res.send("success");
        } catch (e) {
            console.log("remove book: ", e);
            res.status(400).json({ message: "bad request" });
        }
    } else {
        res.send("error");
    }
};
