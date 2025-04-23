import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/auth/useAuth";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) return <p>Carregando...</p>;

  if (!user) return <Navigate to="/login" replace />;

  return children;
}
