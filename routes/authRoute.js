import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
} from "../controller/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

// Router object
const router = express.Router();

// Routing

// REGISTER || Method POST
router.post("/register", registerController);

// LogIn
router.post("/login", loginController);

// Test Route
router.get("/test", requireSignIn, isAdmin, testController);

// Protected Route Auth User Dashboard
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// Protected Route Admin User Dashboard
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// Forgot password
router.post("/forgot-password", forgotPasswordController);

// Update profile
router.put("/profile", requireSignIn, updateProfileController);

export default router;
