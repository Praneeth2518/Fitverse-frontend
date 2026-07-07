import {createContext, useContext} from "react";
import Navbar from "../components/Navbar.jsx";
import App from "../App.jsx";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
    return (
        <AuthContext.Provider value={}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);