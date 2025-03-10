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
            element={user?.role === "admin" ? <Dashboard /> : <Navigate to="/" />}
          />
          <Route
            path="/user-dashboard"
            element={user?.role === "user" ? <UserDashboard /> : <Navigate to="/" />}
          />

          {/* Auth Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Redirect unknown routes to Home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
