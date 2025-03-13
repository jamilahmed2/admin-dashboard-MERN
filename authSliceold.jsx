import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let serverURL = import.meta.env.REACT_APP_SERVER_URL || "http://localhost:5000/api";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isAuthenticated: !!localStorage.getItem("user"),
  isLoading: false,
  error: null
};
export const registerUser = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
  try {
    const response = await axios.post(`${serverURL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});


export const loginUser = createAsyncThunk(`auth/login`, async (userData, thunkAPI) => {
  try {
    const response = await axios.post(`${serverURL}/auth/login`, userData);
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

// Update Admin Profile
export const updateAdminProfile = createAsyncThunk(
  "admin/updateAdminProfile",
  async (adminData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      const response = await axios.put(`${serverURL}/admin/updateAdminProfile`, adminData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to update profile");
    }
  }
);

// Update Admin Password
export const updateAdminPassword = createAsyncThunk(
  "admin/updateAdminPassword",
  async (passwordData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      const response = await axios.put(`${serverURL}/admin/updateAdminPassword`, passwordData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to update password");
    }
  }
);


// Fetch user profile
export const getUserProfile = createAsyncThunk("users/profile", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;
    const response = await axios.get(`${serverURL}/users/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

// Update password
export const updatePassword = createAsyncThunk("users/update-password", async (passwordData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;
    const response = await axios.put(`${serverURL}/users/update-password`, passwordData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

// Update user profile
export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (userData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      const response = await axios.put(`${serverURL}/users/update-profile`, userData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
    },
    updateAdmin: (state, action) => {
      state.user = action.payload; // Update admin data in Redux state
    },
    updateUser: (state, action) => {
      state.user = action.payload; // Update user data in Redux state
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(updateAdminProfile.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload }; // Update state with new admin data
      });
  },
});


export const { logout } = authSlice.actions;
export default authSlice.reducer;