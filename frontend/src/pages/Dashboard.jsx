import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, updateAdminProfile, updateAdminPassword } from "../features/auth/authSlice";

const AdminDashboard = () => {
    const { user, loading, error } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        const resultAction = await dispatch(updateAdminProfile({ name, email }));
    
        if (updateAdminProfile.fulfilled.match(resultAction)) {
            const updatedAdmin = { ...user, name, email }; // Update the admin details in Redux state
            localStorage.setItem("user", JSON.stringify(updatedAdmin)); // Store updated admin data in localStorage
            dispatch({ type: "auth/updateAdmin", payload: updatedAdmin }); // Update Redux manually
        }
    };
    
    

    const handlePasswordChange = (e) => {
        e.preventDefault();
        dispatch(updateAdminPassword({ currentPassword, newPassword })).then((res) => {
            if (res.meta.requestStatus === "fulfilled") {
                setMessage("Password updated successfully");
                setCurrentPassword("");
                setNewPassword("");
            }
        });
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    if (user?.role !== "admin") {
        return <h1 style={styles.accessDenied}>Access Denied! Admins Only</h1>;
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>Admin Dashboard</h1>
                <button 
                    onClick={handleLogout}
                    style={styles.logoutButton}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#dc2626'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#ef4444'}
                >
                    Logout
                </button>
            </div>

            <p style={styles.welcomeText}>Welcome, <strong>{user.name}</strong></p>
            <p style={styles.emailText}>Email: {user.email}</p>

            {error && <p style={styles.error}>{error}</p>}
            {message && <p style={styles.success}>{message}</p>}

            {/* Profile Update Form */}
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
            <form onSubmit={handlePasswordChange} style={styles.form}>
                <input 
                    type="password" 
                    value={currentPassword} 
                    onChange={(e) => setCurrentPassword(e.target.value)} 
                    placeholder="Current Password" 
                    style={styles.input}
                    required 
                />
                <input 
                    type="password" 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    placeholder="New Password" 
                    style={styles.input}
                    required 
                />
                <button type="submit" style={styles.updateButton} disabled={loading}>
                    {loading ? "Changing..." : "Change Password"}
                </button>
            </form>
        </div>
    );
};

// Styles Object
const styles = {
    container: {
        maxWidth: "600px",
        margin: "40px auto",
        padding: "24px",
        backgroundColor: "#2d3748",
        color: "#f9fafb",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        borderRadius: "8px",
        textAlign: "center",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "16px",
    },
    title: {
        fontSize: "24px",
        fontWeight: "bold",
    },
    logoutButton: {
        backgroundColor: "#ef4444",
        color: "white",
        padding: "8px 16px",
        borderRadius: "4px",
        border: "none",
        cursor: "pointer",
        transition: "background-color 0.3s",
    },
    welcomeText: {
        fontSize: "18px",
    },
    emailText: {
        fontSize: "16px",
        color: "#d1d5db",
    },
    error: {
        color: "red",
        marginTop: "10px",
    },
    success: {
        color: "green",
        marginTop: "10px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginTop: "20px",
    },
    input: {
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
    },
    updateButton: {
        backgroundColor: "#3b82f6",
        color: "white",
        padding: "10px",
        borderRadius: "4px",
        border: "none",
        cursor: "pointer",
        transition: "background-color 0.3s",
    },
    accessDenied: {
        color: "red",
        textAlign: "center",
        marginTop: "20px",
    },
};

export default AdminDashboard;
