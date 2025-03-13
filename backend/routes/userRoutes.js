import express from 'express';

import { updateProfile,updatePassword } from '../controller/userController.js'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router();

router.put("/update-profile", protect, updateProfile);
router.put("/update-password", protect, updatePassword);

export default router