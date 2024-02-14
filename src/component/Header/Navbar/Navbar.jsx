import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AdminPasswordModal from "../AdminPasswordModal"; // Import the new component

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const [googleLoggedIn, setGoogleLoggedIn] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const adminPassword = "poolforce@1234"; // Set your admin password here

  useEffect(() => {
    const googleToken = localStorage.getItem("googleToken");
    if (googleToken) {
      setGoogleLoggedIn(true);
    } else {
      setGoogleLoggedIn(false);
    }
  }, []);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("googleToken");
    setLoggedIn(false);
    setGoogleLoggedIn(false);
    navigate("/signin");
  };

  const handleUploadBlogClick = () => {
    setShowPasswordModal(true);
  };

  const handlePasswordSubmit = (enteredPassword) => {
    if (enteredPassword === adminPassword) {
      setShowPasswordModal(false);
      navigate("/upload-blog");
    } else {
      alert("Incorrect password. Please try again.");
      setPassword("");
    }
  };

  return (
    <div className="Navbar-Content">
      <div className="left__Navbar-Content">
        <img src="../../../../images/logo.png" alt="Logo" />
      </div>
      <div className={`center-Content ${menuOpen ? "menu-open" : ""}`}>
        <nav>
          <ul>
            <li>
              <Link
                to="/"
                className={location.pathname === "/" ? "active" : ""}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/faq"
                className={location.pathname === "/faq" ? "active" : ""}
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                to="/blogs"
                className={location.pathname === "/blogs" ? "active" : ""}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={location.pathname === "/about" ? "active" : ""}
              >
                About Us
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className={`right-Content ${menuOpen ? "menu-open" : ""}`}>
        {loggedIn || googleLoggedIn ? (
          <>
            <div className="signup__right-Content">
              <button onClick={handleLogout}>Logout</button>
            </div>
            <div className="signup__right-Content">
              <button onClick={handleUploadBlogClick}>Upload Blog</button>
            </div>
          </>
        ) : (
          <div className="login-signup__right-Content">
            <div className="login__right-Content">
              <Link to="/signin">Login</Link>
            </div>
            <div className="signup__right-Content">
              <button onClick={() => navigate("/signup")}>Sign Up</button>
            </div>
          </div>
        )}
      </div>

      <div
        className={`hamburger-menu ${menuOpen ? "open" : ""}`}
        onClick={handleMenuClick}
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <AdminPasswordModal
          onClose={() => setShowPasswordModal(false)}
          onPasswordSubmit={handlePasswordSubmit}
        />
      )}
    </div>
  );
}
