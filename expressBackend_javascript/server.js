import express from "express";
import BookRouter from "./routes/BookRouter.js";
import UserRouter from "./routes/UserRouter.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(`METHOD: ${req.method}`);
    console.log(`PATH: ${req.path}`);
    console.log(`BODY: ${req.body}`);
    console.log("QUERY: ", req.query);
    console.log("PARAMS: ", req.params);
    next();
});

const connectMongoose = async () => {
    await mongoose.connect(
        "mongodb://localhost:27017/libraryDB"
    );
}
await connectMongoose();

app.use("/books", BookRouter);
app.use("/user", UserRouter);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});