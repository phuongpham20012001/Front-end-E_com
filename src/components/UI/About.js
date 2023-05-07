import React from "react";
import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.about}>
      <h1>Read me</h1>
      <div>This a simple e-commerce website.</div>
      <div>I am using MERN stack to build</div>
      <div>Customer Account: 1@gmail.com pass: 1234567.</div>
      <div>As an user: you can modify your account however you like.</div>
      <div>You can order and track with your account.</div>
      <div>Admin Account: 2@gmail.com pass: 1234567</div>
      <div>You can track customer's order.</div>
    </div>
  );
};

export default About;
