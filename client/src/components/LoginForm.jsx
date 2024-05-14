import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/authContext/AuthContext';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { user, dispatch } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, [user])

    const submitHandle = async (e) => {
        e.preventDefault();
        if (email == '' || password == '') {
            alert("Please complete all information");
            return
        }
        dispatch({ type: "LOGIN_START" })
        try {

            const res = await axios.post("http://localhost:8800/auth/login", {
                email: email,
                password: password
            }, {
                withCredentials: true
            });

            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user })

        } catch (error) {
            dispatch({ type: "LOGIN_FAILURE", payload: error.message });
            alert(error.response.data.message)
        }
    };

    return (
        <form onSubmit={submitHandle}>
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
            <button type='submit'>SignIn</button>
        </form>
    )
}

export default LoginForm