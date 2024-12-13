import { Navigate } from "react-router";
import { useAuth } from "../AuthProvider/AuthProvider";

export const ProtectedRoutes = ({ element }) => {
  const auth = useAuth();
  return auth.isAuthenticated ? element : <Navigate to="/" />;
};
