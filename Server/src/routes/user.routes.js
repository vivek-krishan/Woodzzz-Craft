import { Router } from "express";
import {
  GetUser,
  LogInUser,
  LogOutUser,
  RegisterUser,
  GetOrderHistory,
  UpdateUserDetails,
  regenerateRefreshToken,
  AddAddress,
  selectActiveAddress,
  ChangePassword,
} from "../controllers/User.controller.js";
import { VerifyUser } from "../middlewares/auth.middleware.js";

// Initializing router
const router = Router();

// Register route
router.route("/register").post(RegisterUser);
router.route("/login").post(LogInUser);

// secure routes

router.route("/logout").post(VerifyUser, LogOutUser);
router.route("/refresh-token").post(VerifyUser, regenerateRefreshToken);
router.route("/get-user").get(VerifyUser, GetUser);
router.route("/update-user-details").patch(VerifyUser, UpdateUserDetails);
router.route("/get-watch-history").get(VerifyUser, GetOrderHistory);
router.route("/add-address").post(VerifyUser, AddAddress);
router.route("/select-address").post(VerifyUser, selectActiveAddress);

router.route("/change-password").post(VerifyUser, ChangePassword);

export default router;
