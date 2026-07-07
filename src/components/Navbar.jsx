import {Link} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext.jsx";

export default function Navbar() {
    const { isAuthenticated, logout } = useContext(AuthContext);
    return (
        <div className="navbar-container">
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/exercises">Exercises</Link>
                <Link to="/workouts">Workouts</Link>
                <Link to="/about">About</Link>

            </div>
            {
                isAuthenticated ? (
                    <div className="account-links">
                        <Link to="/profile">Profile</Link>
                        <Link to="/settings">Settings</Link>
                        <button onClick={logout}>Logout</button>
                    </div>
                ) : (
                    <div className="auth-links">
                        <Link to="/sign-up">Sign Up</Link>
                        <Link to="/sign-in">Sign In</Link>
                    </div>
                )
            }
        </div>
    )
}