
import { useState } from 'react';
import {API_BASE_URL} from '../../config';

export default function RegisterForm({ toggleLogin }) {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    const handleRegister = (e) => {
        e.preventDefault();
        fetch(`${API_BASE_URL}/api-register.php`, {                     
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(data => {
            alert(data.message);
            if (data.status === 'success') toggleLogin(); // Switch back to login after registering
        });
    };

    return (
        <div style={{ padding: '30px', border: '1px solid #ccc', borderRadius: '15px', width: '350px', backgroundColor: '#fff' }}>
            <h2>Create Account</h2>
            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input type="text" placeholder="Full Name" required onChange={(e) => setFormData({...formData, name: e.target.value})} style={{ padding: '10px' }} />
                <input type="email" placeholder="Email" required onChange={(e) => setFormData({...formData, email: e.target.value})} style={{ padding: '10px' }} />
                <input type="password" placeholder="Password" required onChange={(e) => setFormData({...formData, password: e.target.value})} style={{ padding: '10px' }} />
                <button type="submit" style={{ background: '#28a745', color: '#fff', padding: '12px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Register</button>
            </form>
            <p style={{ marginTop: '20px', textAlign: 'center' }}>
                Already have an account? <span onClick={toggleLogin} style={{ color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}>Login here</span>
            </p>
        </div>
    );
}