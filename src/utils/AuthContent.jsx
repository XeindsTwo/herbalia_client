import {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";

export const AuthContent = ({authenticated, unauthenticated}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, [isAuthenticated]);

  return isAuthenticated ? authenticated : unauthenticated || <Navigate to="/login"/>;
}