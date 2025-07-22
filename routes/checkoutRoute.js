import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import express from "express";
import { createSessionController } from "../controller/checkoutController.js";
import Stripe from "stripe";

// Router object
const router = express.Router();

// Create Checkout Session Route
router.post("/create-session", requireSignIn, createSessionController);

export default router;
