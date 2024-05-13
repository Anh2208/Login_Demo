import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import React, { useContext, useState, useEffect } from 'react';
import "./Home.css";
import { AuthContext } from '../../context/authContext/AuthContext';

const Home = () => {

    return (
        <div className='container'>
            <div>Welcome to HomePage</div>
        </div>
    );
}

export default Home;
