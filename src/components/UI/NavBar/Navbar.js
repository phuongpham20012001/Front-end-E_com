import styles from "./Navbar.module.css";
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import axios from "../../API/axios";
import RoleContext from "../../Authentication/Context/RoleProvider";
const NavBar = () => {
  const DELETE_URL = "/deleteMe";
  // chỉnh lại cái navBAr

  const { role, setRole } = useContext(RoleContext);

  // console.log(role);
  let token = localStorage.getItem("token");

  const navigate = useNavigate();
  const logout = () => {
    setRole(null); // Use null instead of empty strings
    navigate("/login");
    localStorage.clear();
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
  if (role === "admin") {
    return (
      <div>
        <nav className={styles.nav}>
          <div className={styles.title}>Logo</div>
          <ul className="ul1">
            <Link to="/viewadmin">Product</Link>
            <Link to="/createproduct">Create product</Link>
            <Link to="/about">About</Link>
            <Link to="/vieworder">Order</Link>
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
      </div>
    );
  } else if (role === "user") {
    return (
      <div>
        <nav className={styles.nav}>
          <div className={styles.title}>Logo</div>
          <ul className="ul1">
            <Link to="/product">Product</Link>
            
            <Link to="/about">About</Link>
            <Link to="/order">Order</Link>
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
      </div>
    );
  } else {
    return (
      <div>
        <nav className={styles.nav}>
          <div className={styles.title}>Logo</div>
          <ul className="ul1"></ul>
          <ul>
            {" "}
            <Link to="/about">About</Link>
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
      </div>
    );
  }
};
export default NavBar;
