import { createContext, useEffect, useMemo, useState, ReactNode } from "react";
import { createClient, User } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<User | null>;
  signOut: () => Promise<void>;
  checkSession: () => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const checkSession = async (): Promise<boolean> => {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) {
      console.error("Error getting session:", sessionError.message);
      return false;
    }
    if (sessionData?.session) {
      setUser(sessionData.session.user);
      return true;
    } else {
      setUser(null);
      return false;
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error("Error signing in:", error.message);
      return null;
    }
    setUser(data.user);
    return data.user;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
      throw error; 
    }
    setUser(null);
  };

  const contextValue = useMemo(
    () => ({ user, signIn, signOut, checkSession }), 
    [user]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;