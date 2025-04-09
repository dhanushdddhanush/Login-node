import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../App.css";
export default function Dashboard() {
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }


    axios.get('http://localhost:3000/dashboard', {
      headers: { Authorization: token }
    })
      .then(res => setMsg(res.data.message))
      .catch(err => {
        console.error(err);
        navigate('/login');
      });
  }, [navigate]);

  const handlelogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <h2>Dashboard</h2>
      
      <p>{msg}</p>
      <button onClick={handlelogout}>Logout</button>
    </div>
  );
}
