import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Fetch user profile on page load
    useEffect(() => {
        const email = localStorage.getItem('email'); // Get the email of the logged-in user from local storage or a global state
        if (email) {
            axios.get(`http://localhost:3001/profile?email=${email}`)
                .then(response => {
                    setUser(response.data);
                    setName(response.data.name);
                    setEmail(response.data.email);
                })
                .catch(err => console.error('Error fetching user profile:', err));
        } else {
            navigate('/login'); // If no user is logged in, redirect to login page
        }
    }, [navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedUser = { email, name, password };

        // Update the user details
        axios.put('http://localhost:3001/profile/update', updatedUser)
            .then(response => {
                alert('Profile updated successfully!');
                setUser(response.data);
            })
            .catch(err => console.error('Error updating profile:', err));
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div className="container">
            <h2 className="mt-4">Profile</h2>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="form-group mb-3">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        disabled
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Update Profile</button>
            </form>
        </div>
    );
};

export default Profile;
