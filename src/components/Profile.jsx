// src/components/Profile.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

function Profile() {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    city: "",
    address: "",
    country: ""
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        try {
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            setUserData({
              ...docSnap.data(),
              email: user.email,
            });
          } else {
            toast.warning("No profile data found.");
          }
        } catch (err) {
          toast.error("Error fetching profile data.", err);
        }
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (err) {
      toast.error("Logout failed", err);
    }
  };

  const handleChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    const user = auth.currentUser;
    try {
      await updateDoc(doc(db, "users", user.uid), {
        firstName: userData.firstName,
        lastName: userData.lastName,
        contact: userData.contact,
        city: userData.city,
        address: userData.address,
        country: userData.country,
      });
      toast.success("Profile updated");
      setEditing(false);
    } catch (err) {
      toast.error("Failed to update profile", err);
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-primary px-4 d-flex justify-content-between">
  <div className="d-flex align-items-center text-white">
    <img
      src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
      width="30"
      height="30"
      alt="profile"
      className="me-2 rounded-circle"
    />
    <span>Hello, {userData.firstName || "User"}</span>
  </div>
  <button className="btn btn-danger" onClick={handleLogout}>
    Logout
  </button>
</nav>

      {/* Profile Content */}
      <div className="container mt-5">
        <h3 className="mb-4">User Profile</h3>

        <form className="row g-3">
          <div className="col-md-6">
            <label className="form-label">First Name</label>
            <input
              name="firstName"
              className="form-control"
              value={userData.firstName}
              onChange={handleChange}
              disabled={!editing}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Last Name</label>
            <input
              name="lastName"
              className="form-control"
              value={userData.lastName}
              onChange={handleChange}
              disabled={!editing}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input
              className="form-control"
              value={userData.email}
              disabled
              readOnly
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Contact Number</label>
            <input
              name="contact"
              className="form-control"
              value={userData.contact}
              onChange={handleChange}
              disabled={!editing}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">City</label>
            <input
              name="city"
              className="form-control"
              value={userData.city}
              onChange={handleChange}
              disabled={!editing}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Country</label>
            <input
              name="country"
              className="form-control"
              value={userData.country}
              onChange={handleChange}
              disabled={!editing}
            />
          </div>

          <div className="col-12">
            <label className="form-label">Address</label>
            <input
              name="address"
              className="form-control"
              value={userData.address}
              onChange={handleChange}
              disabled={!editing}
            />
          </div>

          <div className="col-12 mt-4">
            {editing ? (
              <>
                <button
                  type="button"
                  className="btn btn-success me-2"
                  onClick={handleSave}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setEditing(true)}
              >
                Edit Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default Profile;
