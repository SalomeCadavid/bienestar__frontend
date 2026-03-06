import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { token, user } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin) {
    const isAdmin =
      user?.role === "2" ||
      user?.role === 2 ||
      user?.rol_id === 1;

    if (!isAdmin) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;