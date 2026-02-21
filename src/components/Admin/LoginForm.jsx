
import { useState } from 'react';
import {API_BASE_URL} from '../../config';

export default function LoginForm({ onLogin, toggleRegister }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        fetch(`${API_BASE_URL}/api-login.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === 'success') {
                onLogin(data.user); // Send user data to App.jsx
            } else {
                alert(data.message);
            }
        })
        .catch(err => console.error("Login Error:", err));
    };

    return (
        <div style={{ padding: '30px', border: '1px solid #ccc', borderRadius: '15px', width: '350px', backgroundColor: '#fff' }}>
            <h2>Login to GetGadjet</h2>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: '10px' }} />
                <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} style={{ padding: '10px' }} />
                <button type="submit" style={{ background: '#007bff', color: '#fff', padding: '12px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Login</button>
            </form>
            <p style={{ marginTop: '20px', textAlign: 'center' }}>
                New here? <span onClick={toggleRegister} style={{ color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}>Register Now</span>
            </p>
        </div>
    );
}