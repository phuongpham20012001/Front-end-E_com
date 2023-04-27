import styles from "./Navbar.module.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import axios from "../../API/axios";
const NavBar = () => {
  const DELETE_URL = "/deleteMe";
  const auth = localStorage.getItem("user");
  let token = localStorage.getItem("token");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  const handleDelete = async () => {
    token = token.replace(/"/g, "");
    await axios(DELETE_URL, { headers: { Authorization: `Bearer ${token}` } });
    localStorage.clear();
    navigate("/login");
  };
  const submit = () => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to delete this account.",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleDelete(),
        },
        {
          label: "No",
        },
      ],
    });
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };
  return (
    <div>
      {auth  ? (
        <nav className={styles.nav}>
          <div className={styles.title}>Logo</div>
          <ul className="ul1">
            <li>
              <Link to="/">Home</Link>
            </li>
            <Link to="/product">Product</Link>
            <Link to="/#">About</Link>
          </ul>
          <ul>
            <li>
              <Link to="/login" onClick={logout}>
                Logout
              </Link>
            </li>
            <li className={styles.dropdown} onMouseLeave={closeDropdown}>
              <div
                className={styles.dropdownToggle}
                onMouseEnter={toggleDropdown}
                onClick={toggleDropdown}
              >
                Account Settings <span className={styles.caret}></span>
              </div>
              {isDropdownOpen && (
                <ul className={styles.dropdownMenu}>
                  <li>
                    <Link to="/updatePassword">Change Password</Link>
                  </li>
                  <li>
                    <Link to="/updateAccount">Update Account</Link>
                  </li>
                  <li>
                    <Link onClick={submit}>Delete Account</Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
      ) :(
        <nav className={styles.nav}>
          <div className={styles.title}>Logo</div>
          <ul className="ul1"></ul>
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
