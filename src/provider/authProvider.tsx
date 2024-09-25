import { createContext, useEffect, useMemo, useState, ReactNode } from "react";
import { createClient, User } from "@supabase/supabase-js";

const supabaseUrl = "https://yhuhhyjrbuveavowpwlj.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlodWhoeWpyYnV2ZWF2b3dwd2xqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkyMTA5MDMsImV4cCI6MjAyNDc4NjkwM30.MU8HBOHQSBv1xalu97nPz-jnMg9Bq1awELtOZvypahg";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Define the AuthContextType interface
export interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<User | null>;
  signOut: () => Promise<void>;
}

// Create the AuthContext
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getSessionAndUser = async () => {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        console.error("Error getting session:", sessionError.message);
        return;
      }
      if (sessionData?.session) {
        setUser(sessionData.session.user);
      } else {
        setUser(null);
      }
    };
    getSessionAndUser();
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
      throw error; // Rethrow to handle in Header
    }
    setUser(null); // Clear user state after signing out
  };

  const contextValue = useMemo(() => ({ user, signIn, signOut }), [user]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;