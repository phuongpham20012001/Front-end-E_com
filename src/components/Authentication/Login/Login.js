import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import axios from "../../API/axios";
const LOGIN_URL = "/login";
const Login = () => {
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email: user, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(JSON.stringify(response.data["data"]["user"]["role"]));
      localStorage.setItem(
        "user",
        JSON.stringify(response.data["data"]["user"]["role"])
      );
      navigate("/");
      setUser("");
      setPwd("");
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
      <div>
        <section>
          <p ref={errRef} className={styles.errmsg} aria-live="assertive">
            {errMsg}
          </p>
          <h1 className={styles.h1}>Log in</h1>
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
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <button>Sign In</button>
          </form>
          <p className={styles.p1}>
            Need an Account?
            <span className={styles.line}>
              <Link to="/signup">Sign Up</Link>
            </span>
          </p>
        </section>
      </div>
    </div>
  );
};
export default Login;
