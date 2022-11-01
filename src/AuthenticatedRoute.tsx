import { ReactElement } from "react";
import useAuth from "./contexts/AuthContext";
import { useLocation, Navigate } from "react-router-dom";

const AuthenticatedRoute = ({ children }: { children: ReactElement }) => {
  const { isAuth } = useAuth();
  const location = useLocation();

  return isAuth() === true ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
};

export default AuthenticatedRoute;
