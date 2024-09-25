import { useContext } from "react";
import { AuthContext } from "../provider/authProvider"; // Import the AuthContext from the provider

// Custom hook to use the Auth context
export const useAuth = () => {
    return useContext(AuthContext);
};