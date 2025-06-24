// src/components/PrivateRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

function PrivateRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null); // null = loading

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuth(!!user);
    });
    return () => unsubscribe();
  }, []);

  if (isAuth === null) {
    return <div className="text-center mt-5">Checking auth...</div>; // loading state
  }

  return isAuth ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
