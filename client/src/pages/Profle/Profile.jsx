import React, { useContext } from 'react'
import "./Profile.css"
import { AuthContext } from '../../context/authContext/AuthContext'

const Profile = () => {

    const { user } = useContext(AuthContext);

    return (
        <div className='profile'>
            <h2>Profile Page</h2>
            <p>Hello User : {user.username}</p>
        </div>
    )
}

export default Profile