
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../App.css";
export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
      setMsg('Login successful!');
    } catch (err) {
      setMsg(err.response?.data?.error || 'Login failed');
    }
  };

  return (
  <>
    <div className="header">
      <p>Authenticator</p>
    </div>
    <div className="login">
      <h2>Login From Here!!!!!!</h2>
      <form onSubmit={login}>
        <input placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} />
        <input placeholder="Password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
        <button>Login</button>
        <p>{msg}</p>
      </form>
      <p>Don't have an account? <a onClick={() => navigate('/register')}>Register here</a></p>
    </div>
    </>
  );
}
