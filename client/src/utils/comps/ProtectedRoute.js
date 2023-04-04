// depends 
import React from "react";
import { Navigate } from "react-router";


const ProtectedRoute = ({ status, children }) => {
    if (!status) {
      return <Navigate to="/" replace />;
    }
    return children;
};

export default ProtectedRoute;