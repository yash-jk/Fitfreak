import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand">
          <h1>Workout Buddy</h1>
        </Link>
        <nav className="navbar-nav">
          {user && (
            <div className="navbar-links">
              <div className="navlinks">
                <Link to="/" className="dashboard">Dashboard</Link>
                <Link to="/exercises" className="exercises">Exercises</Link>
              </div>         
              <button onClick={handleClick} className="logout-button">Log out</button>
              <span className="user-email">{user.email}</span>
            </div>
          )}
          {!user && (
            <div className="navbar-links">
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="nav-link">Sign up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
