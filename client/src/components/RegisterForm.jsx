import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/authContext/AuthContext';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const RegisterForm = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState(0);
    const [showPassword, setShowPassword] = useState(false);

    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();


    const submitHandle = async (e) => {
        e.preventDefault();
        if (username == '' || email == '' || password == '') {
            alert("Please complete all information");
            return
        }
        try {
            await axios.post("http://localhost:8800/auth/register", {
                username: username,
                email: email,
                password: password,
                isAdmin: role,
            }, {
                withCredentials: true
            });

            dispatch({ type: "REGISTER_SUCCESS" })
            navigate("/login")
        } catch (error) {
            alert(error.response.data.message)
        }
    };

    return (
        <>
            <form onSubmit={submitHandle}>
                <div className='form-control'>
                    <label htmlFor="username">Username :</label>
                    <input type="text" id="username" placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className='form-control'>
                    <label htmlFor="email">Email :</label>
                    <input type="text" id="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='form-control'>
                    <label htmlFor="password">Password :</label>
                    <div className='input'>
                        <input type={showPassword ? 'text' : 'password'} id="password" placeholder='*******' onChange={(e) => setPassword(e.target.value)} />
                        <div className='icon' onClick={() => setShowPassword((prev) => !prev)}>
                            {showPassword ? (
                                <FaEyeSlash />
                            ) : (
                                <FaEye />
                            )}
                        </div>
                    </div>
                </div>
                <div className='form-control'>
                    <label htmlFor="role">Role :</label>
                    <select id="role" onChange={(e) => setRole(e.target.value)}>
                        <option value="0">User</option>
                        <option value="1">Admin</option>
                    </select>
                </div>
                <button type='submit'>SignUp</button>
            </form>
        </>
    )
}

export default RegisterForm