import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserProfile, updatePassword, logout } from "../features/auth/authSlice";

const UserDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, loading, error } = useSelector((state) => state.auth);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            navigate("/login");  // Redirect if no user is found
        } else {
            dispatch(getUserProfile());
        }
    }, [dispatch, navigate]);

    const handlePasswordChange = (e) => {
        e.preventDefault();
        dispatch(updatePassword({ currentPassword, newPassword })).then((res) => {
            if (res.meta.requestStatus === "fulfilled") {
                setMessage("Password updated successfully");
                setCurrentPassword("");
                setNewPassword("");
            }
        });
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login"); // Redirect to login after logout
    };

    return (
        <div style={{ maxWidth: "400px", margin: "40px auto", padding: "24px", backgroundColor: "grey", borderRadius: "8px" }}>
            <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>User Profile</h2>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {user && (
                <>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </>
            )}

            <h3 style={{ fontSize: "20px", fontWeight: "bold", marginTop: "24px" }}>Change Password</h3>
            {message && <p style={{ color: "green" }}>{message}</p>}
            <form onSubmit={handlePasswordChange} style={{ marginTop: "16px" }}>
                <input type="password" placeholder="Current Password" style={{ width: "100%", padding: "8px", marginBottom: "8px" }} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
                <input type="password" placeholder="New Password" style={{ width: "100%", padding: "8px", marginBottom: "8px" }} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                <button type="submit" style={{ width: "100%", padding: "8px", backgroundColor: "#3b82f6", color: "white", border: "none", marginBottom: "8px" }}>Change Password</button>
            </form>

            <button onClick={handleLogout} style={{ width: "100%", padding: "8px", backgroundColor: "#ef4444", color: "white", border: "none" }}>
                Logout
            </button>
        </div>
    );
};

export default UserDashboard;
