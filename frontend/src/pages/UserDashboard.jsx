import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserProfile, updateUserProfile, updatePassword, logout } from "../features/auth/authSlice";

const UserDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, loading, error } = useSelector((state) => state.auth);

    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
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

    // Handle profile update (name & email)
    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        const resultAction = await dispatch(updateUserProfile({ name, email }));

        if (updateUserProfile.fulfilled.match(resultAction)) {
            const updatedUser = { ...user, name, email }; // Update local user data
            localStorage.setItem("user", JSON.stringify(updatedUser)); // Store updated user data
            dispatch({ type: "auth/updateUser", payload: updatedUser }); // Update Redux state
            setMessage("Profile updated successfully!");
        }
    };

    // Handle password change
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

    // Handle logout
    const handleLogout = () => {
        dispatch(logout());
        navigate("/login"); // Redirect to login after logout
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>User Profile</h2>
            {user && (
                <div style={{ marginBottom: '20px', color: '#a0aec0' }}>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                </div>
            )}            {loading && <p>Loading...</p>}
            {error && <p style={styles.error}>{error}</p>}
            {message && <p style={styles.success}>{message}</p>}

            {/* Update Name & Email Form */}
            <form onSubmit={handleProfileUpdate} style={styles.form}>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Name" 
                    style={styles.input} 
                    required 
                />
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email" 
                    style={styles.input} 
                    required 
                />
                <button type="submit" style={styles.updateButton} disabled={loading}>
                    {loading ? "Updating..." : "Update Profile"}
                </button>
            </form>

            {/* Password Change Form */}
            <h3 style={styles.subtitle}>Change Password</h3>
            <form onSubmit={handlePasswordChange} style={styles.form}>
                <input 
                    type="password" 
                    placeholder="Current Password" 
                    style={styles.input} 
                    value={currentPassword} 
                    onChange={(e) => setCurrentPassword(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="New Password" 
                    style={styles.input} 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    required 
                />
                <button type="submit" style={styles.updateButton} disabled={loading}>
                    {loading ? "Changing..." : "Change Password"}
                </button>
            </form>

            {/* Logout Button */}
            <button onClick={handleLogout} style={styles.logoutButton}>
                Logout
            </button>
        </div>
    );
};

// Styles Object
const styles = {
    container: {
        maxWidth: "400px",
        margin: "40px auto",
        padding: "24px",
        backgroundColor: "#2d3748",
        color: "#f9fafb",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        borderRadius: "8px",
        textAlign: "center",
    },
    title: {
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "16px",
    },
    subtitle: {
        fontSize: "20px",
        fontWeight: "bold",
        marginTop: "24px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginTop: "16px",
    },
    input: {
        width: "100%",
        padding: "8px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        marginBottom: "8px",
    },
    updateButton: {
        width: "100%",
        padding: "10px",
        backgroundColor: "#3b82f6",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
    logoutButton: {
        width: "100%",
        padding: "10px",
        backgroundColor: "#ef4444",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        marginTop: "16px",
    },
    error: {
        color: "red",
        marginTop: "10px",
    },
    success: {
        color: "green",
        marginTop: "10px",
    },
};

export default UserDashboard;
