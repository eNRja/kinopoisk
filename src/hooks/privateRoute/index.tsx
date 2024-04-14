import { PropsWithChildren } from "react";
import { useAuth } from "../useAuth";
import { Navigate } from "react-router-dom";
import React from "react";

export const PrivateRoute = ({ children }: PropsWithChildren) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <>{children}</> : <Navigate to="/" replace />;
};
