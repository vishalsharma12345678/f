import { Router } from "express";
import * as authController from "../controllers/user.controller.js";

const router = Router();

router.get("/register", authController.showSignUpPage);
router.post("/register", authController.registerUser);

router.get("/login", authController.showSignInPage);
router.post("/login", authController.loginUser);

router.get("/logout", authController.logoutUser);

export default router;
