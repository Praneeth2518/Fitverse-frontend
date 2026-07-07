import {Link} from 'react-router-dom'

export default function Navbar(){
    return (
        <div className="navbar-container">
            <div className="nav-links">
                <Link to='/'>Home</Link>
                <Link to='/exercises'>Exercises</Link>
                <Link to='/workouts'>Workouts</Link>
                <Link to='/about'>About</Link>

            </div>
            <div className="auth-links">
                <Link to='/sign-up'>Sign Up</Link>
                <Link to='/sign-in'>Sign In</Link>
            </div>
        </div>
    )
}