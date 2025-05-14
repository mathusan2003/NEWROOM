import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserDetails.css';
const UserDetails = () => {
    const [user, setUser] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const email = localStorage.getItem('userEmail'); // Get from localStorage
        if (!email) {
            navigate('/login'); // If not logged in, go to login
            return;
        }

        axios.get(`http://localhost:3001/profile?email=${email}`)
            .then((res) => setUser(res.data))
            .catch((err) => console.log(err));
    }, []);

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put('http://localhost:3001/profile/update', user)
            .then(res => {
                alert("Profile updated!");
            })
            .catch(err => console.log(err));
    };

    const handleLogout = () => {
        localStorage.removeItem('userEmail');
        navigate('/login');
    };

    return (
        <div className="container mt-5">
            <h2>User Profile</h2>
            <form onSubmit={handleUpdate}>
                <div className="mb-3">
                    <label>Name</label>
                    <input type="text" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} className="form-control" />
                </div>
                <div className="mb-3">
                    <label>Email (read-only)</label>
                    <input type="email" value={user.email} className="form-control" readOnly />
                </div>
                <div className="mb-3">
                    <label>New Password (optional)</label>
                    <input type="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Update Profile</button>
                <button type="button" onClick={handleLogout} className="btn btn-danger ms-2">Logout</button>
            </form>
        </div>
    );
};

export default UserDetails;
