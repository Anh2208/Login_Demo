import { useContext } from 'react';
import './App.css'
import Header from './components/Header/Header';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContext } from './context/authContext/AuthContext';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profle/Profile';
import Admin from './pages/Admin/Admin';
import ProtectedRoute from './router/ProtectedRoute';
import NotFound from './components/NotFound';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<><ProtectedRoute userRole={user?.isAdmin != null ? user.isAdmin : null} role='user'><Profile /></ProtectedRoute></>} />
          <Route path='/admin' element={<><ProtectedRoute userRole={user?.isAdmin != null ? user.isAdmin : null} role='admin'><Admin /></ProtectedRoute></>} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
