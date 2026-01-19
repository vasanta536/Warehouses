import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import * as api from "../api/auth";

type User = { id: number; email: string; role?: string };

type AuthContextType = {
  user: User | null;
  loading: boolean;
  doRegister: (email: string, password: string) => Promise<void>;
  doLogin: (email: string, password: string) => Promise<void>;
  doLogout: () => Promise<void>;
};

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.me();
        if (res.user) setUser(res.user);
      } catch {
        try {
          await api.refresh(); // this hits /auth/refresh
          const res2 = await api.me(); // retry
          if (res2.user) setUser(res2.user);
        } catch {
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const doRegister = async (email: string, password: string) => {
    const res = await api.register(email, password);
    if (res.user) setUser(res.user);
  };

  const doLogin = async (email: string, password: string) => {
    const res = await api.login(email, password);
    if (res.user) setUser(res.user);
  };

  const doLogout = async () => {
    await api.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, doRegister, doLogin, doLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
