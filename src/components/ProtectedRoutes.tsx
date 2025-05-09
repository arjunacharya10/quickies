// components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";

type Props = {
  children: JSX.Element;
};

const ProtectedRoute = ({ children }: Props) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
