import styles from "./Navbar.module.css";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import axios from "../API/axios";
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
          label: "No"
       
        },
      ],
    });
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
        </nav>
      ) : (
        <nav className={styles.nav}>
          <div className={styles.title}>Logo</div>
          <ul className="ul1">
            <li>Home</li>
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
