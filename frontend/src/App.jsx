import './App.css'
import { Routes, Route, Navigate, BrowserRouter as Router, Link } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import Home from './pages/Home'
import { useSelector } from 'react-redux'
import UserDashboard from './pages/UserDashboard'

function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Protected Routes Based on Role */}
          <Route
            path="/dashboard"
            element={
              user ? (
                user.role === "admin" ? <Dashboard /> : <Navigate to="/user-dashboard" />
              ) : (
                <Navigate to="/login" /> // Redirect if not logged in
              )
            }
          />
          <Route
            path="/user-dashboard"
            element={
              user ? (
                user.role === "user" ? <UserDashboard /> : <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/login" /> // Redirect if not logged in
              )
            }
          />

          {/* Auth Routes */}
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
          <Route
            path="/login"
            element={!user ? <Login /> : user.role === "admin" ? <Navigate to="/dashboard" /> : <Navigate to="/user-dashboard" />}
          />

          {/* Redirect unknown routes to Home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
