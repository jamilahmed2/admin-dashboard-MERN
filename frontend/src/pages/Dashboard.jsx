import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const AdminDashboard = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    if (user?.role !== "admin") {
        return <h1 style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>Access Denied! Admins Only</h1>;
    }

    return (
        <div style={{ 
            maxWidth: '600px', 
            margin: '40px auto', 
            padding: '24px', 
            backgroundColor: 'grey', 
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
            borderRadius: '8px' 
        }}>
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '16px'
            }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Admin Dashboard</h1>
                <button 
                    onClick={handleLogout}
                    style={{
                        backgroundColor: '#ef4444',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#dc2626'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#ef4444'}
                >
                    Logout
                </button>
            </div>
            <p style={{ fontSize: '18px' }}>Welcome, <strong>{user.name}</strong></p>
            <p style={{ fontSize: '16px', color: 'white' }}>Email: {user.email}</p>
        </div>
    );
};

export default AdminDashboard;
