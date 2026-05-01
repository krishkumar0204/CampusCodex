import { Router } from "express";
import {
  login,
  register,
  logout,
  getMe,
} from "../controllers/auth.controllers.js";

const router = Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/logout").post(logout);
router.route("/me").get(getMe);

export default router;
