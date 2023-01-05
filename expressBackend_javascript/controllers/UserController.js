import UserModel from "../models/UserModel.js";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";


dotenv.config();

export const addUser = async (req, res) => {
    const { firstname, lastname, username, password } = req.body;

    const checkUsername = await UserModel.findOne({ user_name: username });
    console.log(checkUsername);
    
    if (checkUsername === null) {
        const saltRounds = 10;
        const passwdhash = await bcrypt.hash(password, saltRounds);
        const savedUser = { first_name: firstname, last_name: lastname, user_name: username, password_hash: passwdhash };

        const user = await UserModel.create(savedUser);
        res.send(`New user: ${firstname} ${lastname} was saved to database`)
    } else {
        res.send("error")
    }
};
export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send("username or password missing");
    }
    try {
        const userData = await UserModel.findOne({ user_name: username });
        const valid = await bcrypt.compare(password, userData.password_hash);

        if (valid) {
            const token = jsonwebtoken.sign(
                { type: "session", user: username },
                process.env.ENV_JWT_SECRET,
                { expiresIn: "1h" }
            );
            res.status(200).send({ token });

        } else {
            res.status(401).send("forbidden, wrong password");
        }

    } catch (e) {
        res.status(400).send("Something went wrong in authentication");
    };
};

export const refreshToken = (req, res) => {
    res.status(200).json({
        token: jsonwebtoken.sign(
            { type: "session", user: req.user.user },
            process.env.ENV_JWT_SECRET,
            { expiresIn: "1h" })
    });
};
