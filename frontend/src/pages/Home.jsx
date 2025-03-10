import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Home = () => {
    const isLoggedIn = localStorage.getItem('user');
    const user = isLoggedIn ? JSON.parse(localStorage.getItem('user')) : null;
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <header style={styles.header}>
            <nav style={styles.nav}>
                <div style={styles.logo}>RBAC Dashboard</div>
                <ul style={styles.navList}>
                    <li>
                        <Link to="/" style={styles.navLink}>Home</Link>
                    </li>

                    {/* Show Dashboard Link Based on Role */}
                        <li>
                            <Link
                                to={user?.role === "admin" ? "/dashboard" : "/user-dashboard"}
                                style={styles.navLink}
                            >
                                Dashboard
                            </Link>
                        </li>

                    {!isLoggedIn && (
                        <li>
                            <Link to="/register" style={styles.navLink}>Register</Link>
                        </li>
                    )}

                    {isLoggedIn ? (
                        <li>
                            <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
                        </li>
                    ) : (
                        <li>
                            <Link to="/login" style={styles.navLink}>Login</Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

const styles = {
    header: {
        backgroundColor: '#1f2937',
        padding: '16px 24px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#f9fafb',
    },
    navList: {
        listStyle: 'none',
        display: 'flex',
        gap: '16px',
        margin: 0,
        padding: 0,
    },
    navLink: {
        textDecoration: 'none',
        color: '#f9fafb',
        padding: '8px 16px',
        transition: 'background-color 0.3s',
        borderRadius: '4px',
    },
    logoutButton: {
        backgroundColor: '#ef4444',
        color: '#fff',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
};

export default Home;
