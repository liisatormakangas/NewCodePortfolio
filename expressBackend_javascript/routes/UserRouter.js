import express from "express";
import dotenv from "dotenv";
import { 
    addUser,
    loginUser,
    refreshToken
} from "../controllers/UserController.js";

dotenv.config();

import auth from "../passportMiddleware.js";

const router = express.Router();

router.post("/", addUser);
router.post("/login", loginUser);
router.get("/refreshToken", auth, refreshToken);

export default router;