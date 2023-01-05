import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Forgotpassword.module.css";
import axios from "../../API/axios";
const ForgotPassword = () => {
  const FORGOTPASSWORD_URL = "/forgotPassword";
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        FORGOTPASSWORD_URL,
        JSON.stringify({ email: user }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setSuccess(true);
    } catch (err) {
      console.log(err.response.data.message);
      if (err.response) {
        setErrMsg(err.response.data.message);
      }
      errRef.current.focus();
    }
  };
  return (
    <div>
      {success ? (
        <section>The token has been sent successfully.</section>
      ) : (
        <div>
          <section className={styles.form}>
            <p ref={errRef} className={styles.errmsg} aria-live="assertive">
              {errMsg}
            </p>
            <h1 className={styles.h1}>Enter your username</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
              />
              <button>Send</button>
            </form>
          </section>
        </div>
      )}
    </div>
  );
};
export default ForgotPassword;
