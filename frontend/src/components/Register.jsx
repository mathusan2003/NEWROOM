import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({});
    const navigate = useNavigate();

    const validateForm = () => {
        let errors = {};
        if (name.trim().length < 3) {
            errors.name = "Name must be at least 3 characters.";
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Enter a valid email address.";
        }
        if (password.length < 6) {
            errors.password = "Password must be at least 6 characters.";
        }
        return errors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = validateForm();
        setError(errors);

        if (Object.keys(errors).length === 0) {
            axios.post('http://localhost:3001/register', { name, email, password })
                .then(result => {
                    console.log(result);
                    if (result.data === "Already registered") {
                        alert("E-mail already registered! Please Login to proceed.");
                        navigate('/login');
                    } else {
                        alert("Registered successfully! Please Login to proceed.");
                        navigate('/login');
                    }
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-center align-items-center text-center vh-100" 
                 style={{ backgroundImage: "linear-gradient(135deg, #667eea, #764ba2)" }}>
                <div className="bg-white p-3 rounded" style={{ width: '40%' }}>
                    <h2 className='mb-3 text-primary'>Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 text-start">
                            <label className="form-label"><strong>Name</strong></label>
                            <input 
                                type="text"
                                placeholder="Enter Name"
                                className="form-control"
                                onChange={(event) => setName(event.target.value)}
                                required
                            />
                            {error.name && <small className="text-danger">{error.name}</small>}
                        </div>
                        <div className="mb-3 text-start">
                            <label className="form-label"><strong>Email Id</strong></label>
                            <input 
                                type="email"
                                placeholder="Enter Email"
                                className="form-control"
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />
                            {error.email && <small className="text-danger">{error.email}</small>}
                        </div>
                        <div className="mb-3 text-start">
                            <label className="form-label"><strong>Password</strong></label>
                            <input 
                                type="password"
                                placeholder="Enter Password"
                                className="form-control"
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                            {error.password && <small className="text-danger">{error.password}</small>}
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Register</button>
                    </form>

                    <p className='container my-2'>Already have an account?</p>
                    <Link to='/login' className="btn btn-secondary w-100">Login</Link>
                </div>
            </div>
        </div>
    );
}

export default Register;
