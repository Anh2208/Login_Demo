import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Profile from '../pages/Profle/Profile';
import Admin from '../pages/Admin/Admin';
import { AuthContext } from '../context/authContext/AuthContext';
import ProtectedRoute from './ProtectedRoute.jsx';

const Routers = () => {

    const { user } = useContext(AuthContext);

    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/profile' element={<><ProtectedRoute userRole={user?.isAdmin != null ? user.isAdmin : null} role='user'><Profile /></ProtectedRoute></>} />
                <Route path='/admin' element={<><ProtectedRoute userRole={user?.isAdmin != null ? user.isAdmin : null} role='admin'><Admin /></ProtectedRoute></>} />
            </Routes>
        </Router>
    )
}

export default Routers