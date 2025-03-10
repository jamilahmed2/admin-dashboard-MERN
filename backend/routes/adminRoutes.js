import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { updateAdminProfile, updateAdminPassword } from "../controller/adminController.js";

const router = express.Router();

router.put("/updateAdminProfile", protect, adminOnly, updateAdminProfile);
router.put("/updateAdminPassword", protect, adminOnly, updateAdminPassword);

export default router
