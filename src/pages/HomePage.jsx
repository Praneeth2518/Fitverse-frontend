import {useContext} from "react";
import {useAuth} from "../context/AuthContext.jsx";

export default function Home() {
    const { isAuthenticated, user } = useAuth();

    return (
        <div className="home-page">
            <h1>Home</h1>
            {isAuthenticated ? <h2>Welcome {user.displayName}</h2> : <h2>Not Logged in</h2>}
        </div>
    )
}