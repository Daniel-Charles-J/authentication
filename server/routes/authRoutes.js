import express from "express";
import {registerRoute, loginRoute, getContentRoute, postContentRoute} from "../controllers/authController.js"
const router = express.Router();

router.post("/register", registerRoute);
router.post("/login", loginRoute);
router.get("/content", getContentRoute);
router.post("/content", postContentRoute);

export default router;