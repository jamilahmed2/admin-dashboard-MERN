import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isAuthenticated: !!localStorage.getItem("user"),
    isLoading: false,
    error: null
};
export const registerUser = createAsyncThunk("http://localhost:5000/api/auth/register", async (userData, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  });

  
export const loginUser = createAsyncThunk(`http://localhost:5000/api/auth/login`, async (userData, thunkAPI) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/auth/login`, userData);
        localStorage.setItem("user", JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});


// Fetch user profile
export const getUserProfile = createAsyncThunk("http://localhost:5000/api/users/profile", async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      const response = await axios.get("http://localhost:5000/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  });
  
  // Update password
  export const updatePassword = createAsyncThunk("http://localhost:5000/api/users/update-password", async (passwordData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      const response = await axios.put("http://localhost:5000/api/users/update-password", passwordData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  });

  
  
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem("user");
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;