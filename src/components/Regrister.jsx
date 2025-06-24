// src/components/Register.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase"; // ✅ import db from firebase.js
import { doc, setDoc } from "firebase/firestore"; // ✅ Firestore functions
import { toast } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";

function Register() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // ✅ Create user in Firebase Auth
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCred.user;

      // ✅ Store user data in Firestore
     

      await setDoc(doc(db, "users", user.uid), {
          lastName: lname,
          email: email,
          contact: "",
          city: "",
          address: "",
          country: "",
          firstName: fname,
    });

      toast.success("Registration successful!");
      navigate("/profile"); // or navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      navigate("/profile");
    }
  });
  return () => unsubscribe();
}, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="p-5 bg-white shadow rounded" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="mb-4 text-center">Sign Up</h3>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">First name</label>
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Last name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="a@g.co"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>

          <p className="text-center mt-3">
            Already registered? <Link to="/">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
