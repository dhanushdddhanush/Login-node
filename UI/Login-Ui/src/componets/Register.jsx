import { useState } from 'react';
import axios from 'axios';
import "../App.css";
import { useNavigate } from 'react-router-dom';
export default function Register() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [msg, setMsg] = useState('');
  const navigate=useNavigate();

  const register = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/auth/register', form);
      setMsg(res.data.message);
      window.alert(res.data.message);
      navigate('/');
    } catch (err) {
      setMsg(err.response?.data?.error || 'Error registering');
    }
  };

  return (
    <>
    <div className="header">
    <p>Authenticator</p>
  </div>
    <div className="register">
      <h2>Register</h2>
      <form onSubmit={register}>
        <input placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} />
        <input placeholder="Password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
        <button>Register</button>
        <p>{msg}</p>
      </form>
      <p>Already have an account? <a onClick={()=>navigate('/')}>Login</a></p>
    </div>
    </>
  );
}
