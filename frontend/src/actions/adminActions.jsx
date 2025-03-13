import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateAdminProfile, updateAdminPassword } from "../api/api";
import { ADMIN_PROFILE_UPDATE, ADMIN_PASSWORD_UPDATE } from "../actionTypes/actionTypes";

// Update Admin Profile
export const updateAdminProfileAction = createAsyncThunk(ADMIN_PROFILE_UPDATE, async (adminData, thunkAPI) => {
  try {
    const response = await updateAdminProfile(adminData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to update profile");
  }
});

// Update Admin Password
export const updateAdminPasswordAction = createAsyncThunk(ADMIN_PASSWORD_UPDATE, async (passwordData, thunkAPI) => {
  try {
    const response = await updateAdminPassword(passwordData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to update password");
  }
});
