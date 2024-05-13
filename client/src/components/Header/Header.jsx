import React, { useContext, useEffect, useState } from 'react'
import "./Header.css"
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { AuthContext } from '../../context/authContext/AuthContext';

const Header = () => {

    const { user } = useContext(AuthContext);
    const [role, setRole] = useState(false);
    const { dispatch } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            const decoded = jwtDecode(user.accessToken);
            setRole(decoded.isAdmin);
        }
    }, [user]);

    const logoutHandle = async (e) => {
        e.preventDefault();
        try {
            await axios.get("http://localhost:8800/auth/logout", {
                withCredentials: true
            });

            dispatch({ type: "LOGOUT" })
            window.location.reload();

        } catch (error) {
            alert(error)
        }
    }

    return (
        <div className='container'>
            <nav>
                <a href="/">HomePage</a>
                {user ? <a href="/profile">Profile</a> : null}
                {role ? <a href="/admin">AdminPage</a> : null}
                {!user ? (
                    <>
                        <a href="/login">Login</a>
                        <a href="/register">Register</a>
                    </>
                ) : null}
                {user && <button onClick={logoutHandle}>Logout</button>}
            </nav>
        </div>
    )
}

export default Header