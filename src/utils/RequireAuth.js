import { getToken } from "./auth";
import { Navigate, Outlet } from "react-router-dom";

export const RequireAuth = () => {
  const isAuthenticated = Boolean(getToken());

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};
