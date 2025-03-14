# RBAC Dashboard - MERN Stack

A Role-Based Access Control (RBAC) Dashboard built with the MERN stack (MongoDB, Express.js, React, Node.js) that demonstrates user authentication and authorization.

## Features

- 🔐 User Authentication (Login/Register)
- 👥 Role-Based Access Control (Admin/User)
- 👤 User Profile Management
- 🔑 Password Update Functionality
- 📊 Admin Dashboard with User Management
- 🌐 Protected Routes
- 💾 Persistent Auth State
- 🎨 Modern UI Design
## Preview

![image](https://github.com/user-attachments/assets/506bcdb2-2a3f-4a5a-8394-9aeff12ce6b3)

Admin Dashboard
![image](https://github.com/user-attachments/assets/c6bdc240-ebb3-4027-a3ad-1f2ad460138d)

User Dashboard
![image](https://github.com/user-attachments/assets/be0824ef-d63d-41b6-bf89-fc2dd2cfbf11)

login
![image](https://github.com/user-attachments/assets/84c32ff2-06cf-438c-b3f0-986c7ed16225)

register
![image](https://github.com/user-attachments/assets/56cb85be-51c3-409c-afef-b6e361a2e368)

home/nav after logout
![image](https://github.com/user-attachments/assets/3228d3ee-271f-4a1e-b951-0043b5428b8b)








## Tech Stack

### Frontend
- React 19
- Redux Toolkit (State Management)
- React Router v7
- Axios (API calls)
- Vite (Build Tool)

### Backend
- Node.js
- Express.js
- MongoDB (Database)
- JWT (Authentication)
- Bcrypt (Password Hashing)

## Prerequisites

Before running this project, make sure you have:
- Node.js (v16 or higher)
- MongoDB installed locally or MongoDB Atlas account
- Git

  
## Project Structure
```
├── backend/
│   ├── controller/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
└── frontend/
    ├── src/
    │   ├── actions/
    │   ├── api/
    │   ├── features/
    │   ├── pages/
    │   └── App.jsx
    └── package.json
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/jamilahmed2/admin-dashboard-MERN
cd admin-dashboard-MERN
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Create .env files:

Backend (.env):
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Frontend (.env):
```env
VITE_APP_API_URL=backend url
REACT_APP_SERVER_URL=backend url
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
npm run both
```

3. Access the application:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## API Endpoints

### Auth Routes
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user

### User Routes
- PUT /api/users/update-profile - Update user profile
- PUT /api/users/update-password - Update user password

### Admin Routes
- GET /api/admin/getAllUsers - Get all users (Admin only)
- DELETE /api/admin/deleteUser/:id - Delete user (Admin only)
- PUT /api/admin/updateAdminProfile - Update admin profile
- PUT /api/admin/updateAdminPassword - Update admin password



## Security Features

- Password Hashing
- JWT Authentication
- Protected Routes
- Role-Based Access
- Input Validation
- Error Handling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

LinkedIn - https://www.linkedin.com/in/jamil-ahmed-54655220b
Project Link: https://github.com/jamilahmed2/admin-dashboard-MERN
