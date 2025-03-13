import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
    },
    form: {
        backgroundColor: 'grey',
        padding: '24px',
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        width: '320px'
    },
    title: {
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '16px'
    },
    error: {
        color: 'red'
    },
    input: {
        width: '100%',
        padding: '8px',
        marginBottom: '8px',
        border: '1px solid #ccc'
    },
    button: {
        width: '100%',
        padding: '8px',
        backgroundColor: '#3b82f6',
        color: 'white',
        border: 'none',
        cursor: 'pointer'
    }
};

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, loading, error } = useSelector((state) => state.auth);

    // Check if user is already logged in and redirect
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser.role === "admin") {
                navigate("/", { replace: true });  // Use replace to prevent looping
            }
        }
    }, []);
    

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser({ name, email, password, role })).then((res) => {
            if (res.meta.requestStatus === "fulfilled") {
                navigate("/");
            }
        });
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.title}>Register</h2>
                {error && <p style={styles.error}>{error}</p>}
                <input type="text" placeholder="Name" style={styles.input} value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="email" placeholder="Email" style={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" style={styles.input} value={password} onChange={(e) => setPassword(e.target.value)} required />
                <select style={styles.input} value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <button style={styles.button} type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    );
};

export default Register;
