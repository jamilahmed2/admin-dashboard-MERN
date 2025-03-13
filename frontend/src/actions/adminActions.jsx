import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsers,deleteUser, updateAdminProfile, updateAdminPassword } from "../api/api";
import { ADMIN_PROFILE_UPDATE, ADMIN_PASSWORD_UPDATE, ADMIN_GET_ALL_USERS, ADMIN_DELETE_USER } from "../actionTypes/actionTypes";


// Get All Users
export const getAllUsersAction = createAsyncThunk(ADMIN_GET_ALL_USERS, async (_, thunkAPI) => {
  try {
    const response = await getAllUsers();
    // console.log("Users from API:", response.data); // Debugging
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch users");
  }
});

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

// Delete User
export const deleteUserAction = createAsyncThunk(
  ADMIN_DELETE_USER, 
  async (userId, thunkAPI) => {
      try {
          await deleteUser(userId); 
          return userId; 
      } catch (error) {
          return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to delete user");
      }
  }
);
