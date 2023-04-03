import express from "express";
import {
  Login,
  UserReg,
  AdminReg,
  AdminLogin,
  verifyUser,
} from "../Controllers/AuthController.js";

const router = express.Router();

router.post("/register", UserReg);
router.post("/login", Login);
router.post("/admin", AdminReg);
router.post("/adminlog", AdminLogin);
router.put("/confirm/:confirmationCode", verifyUser);

export default router;
