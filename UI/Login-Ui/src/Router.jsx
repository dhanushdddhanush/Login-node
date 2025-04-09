import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Register from './componets/Register';
import Login from './componets/Login';
import Dashboard from './componets/Dashboard';
import './App.css';

export default function App() {


  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/Dashboard" element={<Dashboard   />} />
        <Route path="/Register" element={<Register/>} />
        <Route path="/" element={<Login  />} />
        <Route path="*" element={<Navigate to="/" />} />
    
      </Routes>
    </BrowserRouter>
  );
}