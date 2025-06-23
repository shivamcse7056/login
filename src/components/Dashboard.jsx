// src/components/Dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { toast } from 'react-toastify';

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed!");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="bg-white p-5 shadow rounded text-center" style={{ maxWidth: '500px', width: '100%' }}>
        <h3 className="mb-4">Welcome to Your Dashboard</h3>
        <p className="mb-4">
          <strong>Email:</strong> {auth.currentUser?.email}
        </p>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
