import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import { toast } from 'react-toastify';
import { doc, getDoc } from 'firebase/firestore';

function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserData({
              ...userDoc.data(),
              email: user.email,
            });
          } else {
            toast.error("User data not found in Firestore");
          }
        } catch (err) {
          toast.error("Failed to fetch user info",err);
        }
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe(); // cleanup listener
  }, [navigate]);

  const handleChange = () => {
  toast.info("Navigating to profile...");
  navigate("/profile");
};

  if (!userData) {
    return <div className="text-center mt-5">Loading...</div>; // show loading while waiting
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="bg-white p-5 shadow rounded text-center" style={{ maxWidth: '500px', width: '100%' }}>
        <h3 className="mb-3">Welcome, {userData.firstName} {userData.lastName}</h3>
        <p className="mb-4"><strong>Email:</strong> {userData.email}</p>
        <button className="btn btn-primary" onClick={handleChange}>profile</button>
      </div>
    </div>
  );
}

export default Dashboard;
