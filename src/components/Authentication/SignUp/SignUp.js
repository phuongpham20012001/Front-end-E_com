import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";
import axios from "../../API/axios";
const SIGNUP_URL = "/signup";
const SignUp = () => {
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwdCf, setPwdCF] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);
  //axios
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        SIGNUP_URL,
        JSON.stringify({
          name: name,
          email: user,
          password: pwd,
          passwordConfirm: pwdCf,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      // console.log(JSON.stringify(response.data.token));
      localStorage.setItem(
        "user",
        JSON.stringify(response.data["data"]["user"]["role"])
      );
      localStorage.setItem(
        "token",
        JSON.stringify(response.data.token)
      );
      navigate("/");
      setUser("");
      setPwd("");
      setPwd("");
      setPwdCF("");
    } catch (err) {
      if (err.response) {
        setErrMsg("Check the given information again");
      }
      errRef.current.focus();
    }
  };
  return (
    <div>
      <section>
        <p ref={errRef} className={styles.errmsg} aria-live="assertive">
          {errMsg}
        </p>
        <h1 className={styles.h1}>SignUp</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            autoComplete="off"
            ref={userRef}
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
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
          <label htmlFor="password">Password Confirm:</label>
          <input
            type="password"
            id="password confirm"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setPwdCF(e.target.value)}
            value={pwdCf}
            required
          />
          <button>Sign Up</button>
        </form>
        <p className={styles.p1}>
          <span className={styles.line}></span>
        </p>
      </section>
    </div>
  );
};

export default SignUp;
