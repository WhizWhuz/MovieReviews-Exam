import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role = null }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (role === "admin") {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.role !== "admin") {
        return <Navigate to="/" />;
      }
    } catch (err) {
      console.error("Token decoding failed", err);
      return <Navigate to="/login" />;
    }
  }

  return children;
}

export default ProtectedRoute;
