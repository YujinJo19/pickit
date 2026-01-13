import React, { JSX } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: JSX.Element;
  roles: string[];
}

export function PrivateRoute({ children, roles }: PrivateRouteProps) {
  const role = useSelector((state: any) => state.auth.role);
  console.log("role", role);

  if (roles && !roles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
