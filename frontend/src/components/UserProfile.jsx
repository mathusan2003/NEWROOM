import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    const username = JSON.parse(localStorage.getItem('user'))?.username; // Get username from localStorage

    useEffect(() => {
        if (!username) {
            navigate('/login'); // Redirect to login if no username found
            return;
        }

        axios.get(`http://localhost:3001/user/profile?username=${username}`)
            .then((response) => {
                setUserData(response.data);
            })
            .catch((err) => {
                setError(err.response ? err.response.data.message : "Error fetching user data");
            });
    }, [username, navigate]);

    if (!userData) {
        return (
            <div className="text-center">
                <h2>Loading...</h2>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <h2>User Profile</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="card">
                <div className="card-header">
                    <h4>{userData.fullName}'s Profile</h4>
                </div>
                <div className="card-body">
                    <p><strong>Username:</strong> {userData.username}</p>
                    <p><strong>Address:</strong> {userData.address}</p>
                    <p><strong>Phone Number:</strong> {userData.phoneNumber}</p>
                    <p><strong>NIC Number:</strong> {userData.nicNumber}</p>
                </div>
            </div>
            <button onClick={() => navigate('/edit-profile')} className="btn btn-primary mt-3">Edit Profile</button>
        </div>
    );
};

export default UserProfile;
