import React, { useRef, useState, useEffect } from "react";

import styles from "./UpdatePassword.module.css";
import axios from "../../API/axios";
const UPDATEPASSWORD_URL = "/updatePassword";
const UpdatePassword = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  let token = localStorage.getItem("token");
  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [currentPassword, newPassword, newPasswordConfirm]);
  //axios
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      token = token.replace(/"/g, "");
      const response = await axios.patch(
        UPDATEPASSWORD_URL,
        JSON.stringify({
          passwordCurrent: currentPassword,
          password: newPassword,
          passwordConfirm: newPasswordConfirm,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(JSON.stringify(response.data.token));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      setSuccess(true);
    } catch (err) {
      if (err.response) {
        setErrMsg("Check the given information again");
      }
      errRef.current.focus();
    }
  };
  return (
    <div>
      {success ? (
        <section> Your password have been updated</section>
      ) : (
        <div>
          <section>
            <p ref={errRef} className={styles.errmsg} aria-live="assertive">
              {errMsg}
            </p>
            <h1 className={styles.h1}>Update Password</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="currentPassword">Current Password:</label>
              <input
                type="password"
                id="password"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setCurrentPassword(e.target.value)}
                value={currentPassword}
                required
              />
              <label htmlFor="password">New Password:</label>
              <input
                type="password"
                id="new password"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
                required
              />
              <label htmlFor="password">New Password Confirm:</label>
              <input
                type="password"
                id="new password confirm"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setNewPasswordConfirm(e.target.value)}
                value={newPasswordConfirm}
                required
              />
              <button>Change Password</button>
            </form>
            <p className={styles.p1}>
              <span className={styles.line}></span>
            </p>
          </section>
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
