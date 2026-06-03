import { Link } from "react-router-dom";
import { useContext } from "react";
import useAuth from "../Context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const initial = user?.email ? user.email.split("@")[0].trim().charAt(0).toUpperCase() : "";

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          UrbanCart
        </Link>

        <div className="navbar-links">
          <Link to="/" className="navbar-link">
            Home
          </Link>
          <Link to="/checkout" className="navbar-link">
            Cart
          </Link>
        </div>

        <div className="navbar-auth">
          {user ? (
            <div className="navbar-user-row">
              <div className="avatar" title={user.email} aria-hidden>
                {initial}
              </div>
              <button type="button" className="btn btn-secondary" onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="navbar-auth-link">
              <Link to="/auth?mode=login" className="btn btn-primary">
                Login
              </Link>
              <Link to="/auth?mode=signup" className="btn btn-secondary">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
