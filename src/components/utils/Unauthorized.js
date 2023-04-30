/* Unauthorized.js */

import { useNavigate } from "react-router-dom";
import React from "react";
import styles from "./Unauthorized.module.css";

const Unauthorized = () => {
  const navigate = useNavigate();
  const goBack = () => navigate("/login");

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Unauthorized</h1>
      <p className={styles.message}>You do not have access to the requested page.</p>
      <div className={styles.flexGrow}>
        <button className={styles.button} onClick={goBack}>Go Back</button>
      </div>
    </section>
  );
};

export default Unauthorized;