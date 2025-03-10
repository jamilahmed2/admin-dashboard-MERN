import User from "../models/User.js";
import bcrypt from "bcryptjs";
import dotenv from 'dotenv';
dotenv.config();

// Update Admin Profile (Name, Email)
export const updateAdminProfile = async (req, res) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied!" });
    }

    const admin = await User.findById(req.user.id);
    if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
    }

    admin.name = req.body.name || admin.name;
    admin.email = req.body.email || admin.email;

    const updatedAdmin = await admin.save();
    res.json({
        id: updatedAdmin.id,
        name: updatedAdmin.name,
        email: updatedAdmin.email,
        role: updatedAdmin.role,
        token: req.user.token,
    });
};

// Update Admin Password
export const updateAdminPassword = async (req, res) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied!" });
    }

    const { currentPassword, newPassword } = req.body;
    const admin = await User.findById(req.user.id);

    if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Current password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(newPassword, salt);

    await admin.save();
    res.json({ message: "Password updated successfully" });
};
