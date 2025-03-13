import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { updateAdminProfile, updateAdminPassword, getAllUsers, deleteUser } from "../controller/adminController.js";

const router = express.Router();

router.get("/getAllUsers", protect, adminOnly, getAllUsers);
router.delete("/deleteUser/:id", protect, adminOnly, deleteUser);
router.put("/updateAdminProfile", protect, adminOnly, updateAdminProfile);
router.put("/updateAdminPassword", protect, adminOnly, updateAdminPassword);

export default router
