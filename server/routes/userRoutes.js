
import express from "express";
import {
  forgotPasswordController,
  getUserProfileController,
  loginController,
  logoutController,
  registerController,
  resetPasswordController,
  sendOtpEmailController,
  updateProfileController,
  updateProfilePicController,
  verifyOtpController,
} from "../controllers/userController.js";
import { isAdmin, isAuth, requireSignIn } from "../middlewares/authMiddleware.js";
import { singleUpload } from "../middlewares/multer.js";

import { rateLimit } from 'express-rate-limit'

/// RATE LIMITER 
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})

//router object
const router = express.Router();

//routes
// register
router.post("/register" , registerController);

//login
router.post("/login",  loginController);

//profile
router.get("/profile/:id",  getUserProfileController);

//logout
router.get("/logout",  logoutController);

// uopdate profile
router.put("/profile-update" , requireSignIn , updateProfileController);

// updte password

router.post("/forgot-password", forgotPasswordController);
router.post("/sendOtp",  sendOtpEmailController);
router.post("/verifyOtp",  verifyOtpController);

// update profile pic
router.put("/update-picture", singleUpload, updateProfilePicController);

// FORGOT PASSWORD
router.post("/reset-password",resetPasswordController);  

//protected User route auth
router.get("/user-auth", requireSignIn , (req, res) => {
  res.status(200).send({ ok: true });
});

//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//export
export default router;
