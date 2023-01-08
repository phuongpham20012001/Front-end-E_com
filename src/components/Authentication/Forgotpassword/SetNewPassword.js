import React, { useRef, useState, useEffect } from "react";
import {  useParams } from "react-router-dom";
import styles from "./Forgotpassword.module.css";
import axios from "../../API/axios";
const SetNewPassword = () => {
  let { token } = useParams();
  const SETNEWPASSWORD_URL = `/resetPassword/${token}`;;
  const userRef = useRef();
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwdCf, setPwdCF] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
    console.log({ token });
  }, [pwd], [pwdCf]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(
        SETNEWPASSWORD_URL,
        JSON.stringify({ password: pwd, passwordConfirm: pwdCf }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setSuccess(true);
      console.log("okay");
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
        <section>Your password has been changed</section>
      ) : (
        <div>
          <section className={styles.form}>
            <p ref={errRef} className={styles.errmsg} aria-live="assertive">
              {errMsg}
            </p>
            <h1 className={styles.h1}>New Password</h1>
            <form onSubmit={handleSubmit}>
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
              <button>Send</button>
            </form>
          </section>
        </div>
      )}
    </div>
  );
};
export default SetNewPassword;
