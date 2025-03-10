import express from 'express';

import { getUserProfile, updateProfile,updatePassword } from '../controller/authController.js'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router();

router.get("/profile", protect, getUserProfile);
router.put("/update-profile", protect, updateProfile);
router.put("/update-password", protect, updatePassword);

export default router