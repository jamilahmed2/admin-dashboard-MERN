import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateUserProfile, updatePassword } from "../api/api";
import {  USER_PROFILE_UPDATE, USER_PASSWORD_UPDATE } from "../actionTypes/actionTypes";


// Update User Profile
export const updateUserProfileAction = createAsyncThunk(USER_PROFILE_UPDATE, async (userData, thunkAPI) => {
  try {
    const response = await updateUserProfile(userData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to update profile");
  }
});

// Update User Password
export const updateUserPasswordAction = createAsyncThunk(USER_PASSWORD_UPDATE, async (passwordData, thunkAPI) => {
  try {
    const response = await updatePassword(passwordData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});
