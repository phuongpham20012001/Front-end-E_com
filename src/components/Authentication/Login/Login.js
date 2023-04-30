import React, { useRef, useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import AuthContext from "../Context/AuthProvider";
import RoleContext from "../Context/RoleProvider";
import axios from "../../API/axios";
const LOGIN_URL = "/login";
const Login = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const { setRole } = useContext(RoleContext);
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
    localStorage.clear();
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

      localStorage.setItem("token", JSON.stringify(response.data.token));
      setAuth({ user, pwd });
      setRole(response.data.data.user.role)
   

      if (response.data.data.user.role === "admin") {
        navigate("/viewadmin");
      } else if (response.data.data.user.role === "user") {
        navigate("/product");
      }

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
            <span className={styles.line}>
              <Link to="/forgotPassword">Forgot Password</Link>
            </span>
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
