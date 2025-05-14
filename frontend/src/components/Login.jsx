import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import loginImage from '../assets/login.jpg';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showDoorAnimation, setShowDoorAnimation] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);

        axios.post('http://localhost:3001/login', { email, password })
            .then(response => {
                const { success, message } = response.data;

                if (success) {
                    localStorage.setItem("userEmail", email);
                    setShowDoorAnimation(true);

                    setTimeout(() => {
                        navigate('/Home');
                    }, 2500);
                } else {
                    alert(message || 'Login failed');
                    setIsLoading(false);
                }
            })
            .catch(err => {
                console.log(err);
                alert('Something went wrong. Please try again later.');
                setIsLoading(false);
            });
    };

    return (
        <div className="login-container">
            {showDoorAnimation && (
                <div className="door-animation">
                    <div className="door left-door"><div className="door-handle"></div><div className="keyhole"></div></div>
                    <div className="door right-door"><div className="door-handle"></div><div className="keyhole"></div></div>
                    <div className="welcome-message">Welcome to Your Room!</div>
                </div>
            )}

            <div className={`login-form-container ${showDoorAnimation ? 'fade-out' : ''}`}>
                <div className="login-form-wrapper">
                    <div className="login-illustration" style={{ backgroundImage: `url(${loginImage})` }}>
                        <div style={{ textAlign: 'center', paddingTop: '320px' }}>
                            <Link to="/register" className="btn btn-outline-primary">Create an account</Link>
                        </div>
                    </div>

                    <div className="form-content">
                        <h2 className="text-center mb-4">Log In</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <div className="input-group">
                                    <span className="input-group-text"><i className="bi bi-person"></i></span>
                                    <input type="email" placeholder="Email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="input-group">
                                    <span className="input-group-text"><i className="bi bi-lock"></i></span>
                                    <input type="password" placeholder="Password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </div>
                            </div>
                            <div className="mb-3 text-end">
                                <Link to="/forgot-password" className="text-decoration-none">Forgot Password?</Link>
                            </div>
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="rememberMe" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                                <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                            </div>
                            <button type="submit" className="btn btn-primary w-100 mb-3" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                        Logging in...
                                    </>
                                ) : 'Log In'}
                            </button>
                        </form>
                        <div className="text-center">
                            <p>Or login with</p>
                            <div className="d-flex justify-content-center gap-2">
                                <button className="btn btn-outline-primary"><i className="bi bi-facebook"></i></button>
                                <button className="btn btn-outline-info"><i className="bi bi-twitter"></i></button>
                                <button className="btn btn-outline-danger"><i className="bi bi-google"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
