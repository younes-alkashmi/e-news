import express from "express";
import {
  deleteUser,
  follow,
  unfollow,
  getUser,
  updateUser,
  getAllUsers,
  Approval,
  removeUsers,
  updateAdmin,
  getSuggestions,
} from "../Controllers/UserController.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.get("/:id/suggestions", getSuggestions);
router.put("/:id/updateAdmin", updateAdmin);
router.put("/approve", Approval);
router.put("/:id", updateUser);
router.delete("/remove", removeUsers);
router.delete("/:id", deleteUser);
router.put("/:id/follow", follow);
router.put("/:id/unfollow", unfollow);
export default router;
