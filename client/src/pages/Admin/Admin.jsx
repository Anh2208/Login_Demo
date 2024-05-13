import React, { useContext } from 'react'
import "./Admin.css"
import { AuthContext } from '../../context/authContext/AuthContext'

const Admin = () => {

    const { user } = useContext(AuthContext);

    return (
        <div className='admin'>
            <h2>Admin Page</h2>
            <p>Hello Admin: {user.username}</p>
        </div>
    )
}

export default Admin