import React, { useRef, useState, useEffect } from "react";
import styles from "./UpdateAccount.module.css";
import axios from "../../API/axios";

const UPDATEACCOUNT_URL = "/updateMe";
const UpdateAccount = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  let token = localStorage.getItem("token");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");

  }, [user][name]);
  //axios
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      token = token.replace(/"/g, "");
      await axios.patch(
        UPDATEACCOUNT_URL,
        JSON.stringify({
          email: user,
          name: name,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
        <section> Your information have been updated </section>
      ) : (
        <div>
          <section>
            <p ref={errRef} className={styles.errmsg} aria-live="assertive">
              {errMsg}
            </p>
            <h1 className={styles.h1}>Update Account</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="user">User:</label>
              <input
                type="text"
                id="text"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
              />
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="text"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
              <button>Change</button>
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

export default UpdateAccount;
