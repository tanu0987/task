import React, { useState } from 'react';
import axios from 'axios';

const AuthForm = ({ mode }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = mode === 'register' ? '/api/auth/register' : '/api/auth/login';
        try {
            const response = await axios.post(endpoint, { username, password });
            console.log(response.data);
        } catch (error) {
            console.error(error.response.data);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{mode === 'register' ? 'Register' : 'Login'}</h2>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">{mode === 'register' ? 'Register' : 'Login'}</button>
        </form>
    );
};

export default AuthForm;
