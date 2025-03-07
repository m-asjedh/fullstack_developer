import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const getAuthToken = () => localStorage.getItem("authToken");

  if (!getAuthToken()) {
    return <Navigate to="/signup" replace />;
  }

  return children;
};

export default ProtectedRoute;
