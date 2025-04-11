import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/'); 
      return;
    }

    axios.get('http://localhost:3000/auth/dashboard', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        setMessage(res.data.message);
      })
      .catch(() => {
        localStorage.removeItem('token'); 
        navigate('/'); 
      });
  }, [navigate]);
  const handlelogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };


  return (
    <>
    <div>
       <div className="header">
      <p>Dashboard</p>
    </div>
    <div className="flexdiv">
      <h1>{message}</h1>
      <button className='logout' onClick={handlelogout}>Logout</button></div>
    </div>
    </>
  );
}
