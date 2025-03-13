import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllUsersAction, deleteUserAction, updateAdminProfileAction, updateAdminPasswordAction, logout } from "../features/auth/authSlice.jsx";


const AdminDashboard = () => {
    const { user, totalUsers, loading, error } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (user && user.role === "admin") {
            // console.log("Admin logged in, fetching users");
            dispatch(getAllUsersAction());
        }
    }, [user, dispatch]);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        const resultAction = await dispatch(updateAdminProfileAction({ name, email }));

        if (updateAdminProfileAction.fulfilled.match(resultAction)) {
            const updatedAdmin = { ...user, name, email }; // Update the admin details in Redux state
            dispatch({ type: "auth/updatedAdmin", payload: updatedAdmin }); // Update admin data in Redux state
            localStorage.setItem("user", JSON.stringify(updatedAdmin)); // Store updated admin data in localStorage
            setMessage("Password updated successfully");

        }
    };


    const handlePasswordChange = (e) => {
        e.preventDefault();
        dispatch(updateAdminPasswordAction({ currentPassword, newPassword })).then((res) => {
            if (res.meta.requestStatus === "fulfilled") {
                setMessage("Password updated successfully");
                setCurrentPassword("");
                setNewPassword("");
            }
        });
    };

    const handleDeleteUser = (userId) => {
        if (userId === user._id && user.role === "admin") {
            alert("You cannot delete your own account!");
            return;
        }

        if (window.confirm("Are you sure you want to delete this user?")) {
            dispatch(deleteUserAction(userId));
        }
    };

    if (user?.role !== "admin") {
        return <h1 style={styles.accessDenied}>Access Denied! Admins Only</h1>;
    }

    const handleLogout = () => {

        dispatch(logout());
        navigate('/')

    };

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

            <div style={styles.statsSection}>
                <h2>User Management</h2>
                <p>Total Users: {totalUsers?.length || 0}</p>

                {loading ? (
                    <p>Loading users...</p>
                ) : (
                    <div style={styles.userListContainer}>
                        {Array.isArray(totalUsers) && totalUsers.length > 0 ? (
                            <ul style={styles.userList}>
                                {totalUsers.map((user) => (
                                    <li key={user._id} style={styles.userItem}>
                                        <strong>{user.name}</strong> - {user.email} ({user.role})
                                        {user.role !== "admin" && (
                                            <button onClick={() => handleDeleteUser(user._id)} style={styles.deleteButton}>
                                                Delete
                                            </button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No users found</p>
                        )}
                    </div>
                )}
            </div>

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
    userListContainer: {
        maxHeight: "200px",
        overflowY: "auto",
        marginTop: "10px",
        padding: "10px",
        backgroundColor: "#1f2937",
        borderRadius: "4px",
    },
    userList: {
        listStyleType: "none",
        padding: 0,
        margin: 0,
    },
    userItem: {
        padding: "8px 0",
        borderBottom: "1px solid #4b5563",
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
