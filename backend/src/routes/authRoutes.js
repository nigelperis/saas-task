import express from "express";
import { register, login } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.post("/register", register);
router.post("/login", login);

export default router;
