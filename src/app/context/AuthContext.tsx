import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface AuthUser {
  name: string;
  email: string;
  avatar: string;
  bio: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

function deriveNameFromEmail(email: string): string {
  const local = email.split("@")[0];
  return local
    .split(/[._-]/)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

const GOOGLE_MOCK_USERS = [
  { name: "Alex Johnson", email: "alex.johnson@gmail.com", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=AlexJ", bio: "Curious reader and occasional writer. Google account user." },
  { name: "Maya Patel", email: "maya.patel@gmail.com", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=MayaP", bio: "Tech enthusiast. Love reading about AI and design." },
];

const STORAGE_KEY = "blogify_auth_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // ignore parse errors
    } finally {
      setIsLoading(false);
    }
  }, []);

  const persistUser = (u: AuthUser) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    setUser(u);
  };

  const login = async (email: string, password: string) => {
    // Simulate network delay
    await new Promise(res => setTimeout(res, 800));

    if (!email || password.length < 6) {
      throw new Error("Invalid email or password (min 6 characters).");
    }

    const name = deriveNameFromEmail(email);
    const seed = name.replace(/\s+/g, "");
    const newUser: AuthUser = {
      name,
      email,
      avatar: `https://api.dicebear.com/7.x/notionists/svg?seed=${seed}`,
      bio: "Blogify member. Reading and writing stories that matter.",
    };
    persistUser(newUser);
  };

  const loginWithGoogle = async () => {
    await new Promise(res => setTimeout(res, 600));
    const mock = GOOGLE_MOCK_USERS[Math.floor(Math.random() * GOOGLE_MOCK_USERS.length)];
    persistUser(mock);
  };

  const register = async (name: string, email: string, password: string) => {
    await new Promise(res => setTimeout(res, 800));

    if (!name.trim() || !email || password.length < 6) {
      throw new Error("Please fill in all fields correctly.");
    }

    const seed = name.replace(/\s+/g, "");
    const newUser: AuthUser = {
      name: name.trim(),
      email,
      avatar: `https://api.dicebear.com/7.x/notionists/svg?seed=${seed}`,
      bio: "New to Blogify. Excited to start reading and writing!",
    };
    persistUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginWithGoogle,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
