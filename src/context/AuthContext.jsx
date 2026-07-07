import {createContext, useContext, useState } from "react";
import Navbar from "../compenents/Navbar.jsx";
import App from "../App.jsx";
import api from "../../api/axios.js";
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("token") !== null);
    const navigate = useNavigate();


    async function signInFunc(data) {
        const { data: res } = await api.post("/auth/sign-in", data);

        if(res.success){
            setToken(res.data.token);
            setUser(res.data.user);
            setIsAuthenticated(true);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            navigate("/", { replace: true });
        }
    }

    async function signUpFunc(data) {
        const { data: res } = await api.post("/auth/sign-up", data);

        if(res.success){
            setToken(res.data.token);
            setUser(res.data.user);
            setIsAuthenticated(true);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            navigate("/", { replace: true });
        }
    }

    function logout() {
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/sign-in");
    }

    return (
        <AuthContext.Provider value={{ token, setToken, isAuthenticated, setIsAuthenticated, signInFunc, signUpFunc, user, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);