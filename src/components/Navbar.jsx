import { Link } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

const Navbar = () => {
    return (
        <nav>
            <Link to="/">Home</Link>

            {isAuthenticated() ? (
                <>
                    <Link to="/add-job">Add Job</Link>
                    <Link to="/dashboard">Dashboard</Link>
                    <button
                        onClick={() => {
                            localStorage.removeItem("token");
                            window.location.href = "/login";
                        }}>
                        Logout
                    </button>
                </>
            ) : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )
            }
        </nav >
    )
}

export default Navbar