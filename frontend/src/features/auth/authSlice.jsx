import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../../actions/authActions.jsx";
import { updateAdminProfileAction, updateAdminPasswordAction } from '../../actions/adminActions.jsx'
import { updateUserProfileAction, updateUserPasswordAction } from '../../actions/userActions.jsx'

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isAuthenticated: !!localStorage.getItem("user"),
    isLoading: false,
    error: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        updatedAdmin: (state, action) => {
            state.user = action.payload; // Update admin data in Redux state
        },
        updatedUser: (state, action) => {
            state.user = action.payload; // Update user data in Redux state
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem("user");
        },
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
                state.error = null;
                localStorage.setItem("user", JSON.stringify(action.payload));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                state.error = null;
                localStorage.setItem("user", JSON.stringify(action.payload));
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateAdminProfileAction.fulfilled, (state, action) => {
                state.admin = { ...state.admin, ...action.payload };
            })
            .addCase(updateUserProfileAction.fulfilled, (state, action) => {
                state.user = { ...state.user, ...action.payload };
            });
    },
});
export { registerUser, loginUser, updateAdminProfileAction, updateAdminPasswordAction, updateUserProfileAction, updateUserPasswordAction };
export const { logout } = authSlice.actions;
export default authSlice.reducer;
