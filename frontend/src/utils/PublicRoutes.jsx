import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoutes = ({ children }) => {
  const userIsLogged = localStorage.getItem("loggedUserEmail");

  return userIsLogged ? <Navigate to="/profile" /> : children;
};

export default PublicRoutes;
