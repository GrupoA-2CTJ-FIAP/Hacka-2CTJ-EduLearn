import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yhuhhyjrbuveavowpwlj.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlodWhoeWpyYnV2ZWF2b3dwd2xqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkyMTA5MDMsImV4cCI6MjAyNDc4NjkwM30.MU8HBOHQSBv1xalu97nPz-jnMg9Bq1awELtOZvypahg";
const supabase = createClient(supabaseUrl, supabaseAnonKey);


// Export the AuthContext so it can be used in the custom hook
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Fetch the session and user when the component mounts
  useEffect(() => {
    const getSessionAndUser = async () => {
      // First, get the session
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) {
        console.error("Error getting session:", sessionError.message);
        return;
      }

      // Check if there's an active session
      if (sessionData?.session) {
        setUser(sessionData.session.user);
      } else {
        console.log("No active session found.");
        setUser(null); // Set user to null if no session is found
      }
    };

    getSessionAndUser(); // Call the function to get session and user

    // Listen to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    // Cleanup listener on component unmount
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    console.error("Error signing in:", error.message);
    return null;
  }
  console.log("User logged in:", data.user);
  setUser(data.user);  // Make sure the user is updated in the state
  return data.user;
};

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    }
  };

  const contextValue = useMemo(
    () => ({
      user,
      signIn,
      signOut,
    }),
    [user]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;