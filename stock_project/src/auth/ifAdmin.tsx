// src/components/ifAdmin.tsx
import { useAuth } from "@/auth/useAuth";

type IfAdminProps = {
  children: React.ReactNode;
};

export function IfAdmin({ children }: IfAdminProps) {
  const { user } = useAuth();
  const isAdmin = user?.get("isAdmin") === true;

  if (!isAdmin) return null;

  return <>{children}</>;
}
