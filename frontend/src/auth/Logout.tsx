// src/auth/Logout.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export default function Logout() {
  const { doLogout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await doLogout();        // clears cookies + context
      navigate("/login");      // redirect to login page
    })();
  }, [doLogout, navigate]);

  return <div>Logging out...</div>;
}
