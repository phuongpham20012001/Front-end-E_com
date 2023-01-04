import styles from "./Navbar.module.css";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
const NavBar = () => {
  const auth = localStorage.getItem("user");
  console.log(auth);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
  };
  return (
    <div>
      {auth ? (
        <nav className={styles.nav}>
          <div className={styles.title}>Logo</div>
          <ul className="ul1">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>Pricing</li>
            <li>About</li>
          </ul>
          <ul>
            <li>
              <Link to="/login" onClick={logout}>
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        <nav className={styles.nav}>
          <div className={styles.title}>Logo</div>
          <ul className="ul1">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>Pricing</li>
            <li>About</li>
          </ul>
          <ul>
            <li>
              <Link to="/login">Log In</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};
export default NavBar;
