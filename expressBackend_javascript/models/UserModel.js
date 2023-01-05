import mongoose from "mongoose";

const userIdSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    password_hash: String,
    user_name: String
});

const UserModel = mongoose.model("users", userIdSchema);
export default UserModel;