import React from "react";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  if (!isLoggedIn) {
    alert("Please login to export IP data");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RequireAuth;
