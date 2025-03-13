import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, register } from "../api/api";
import { AUTH_LOGIN, AUTH_REGISTER} from "../actionTypes/actionTypes";

// Register
export const registerUser = createAsyncThunk(AUTH_REGISTER, async (userData, thunkAPI) => {
  try {
    const response = await register(userData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

// Login
export const loginUser = createAsyncThunk(AUTH_LOGIN, async (userData, thunkAPI) => {
  try {
    const response = await login(userData);
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});