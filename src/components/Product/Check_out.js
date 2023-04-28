import React from "react";
import styles from "./Check_out.module.css";
import { useNavigate } from "react-router-dom";

function Checkout() {
    const navigate = useNavigate();
  return (
    <div className={styles.page}>
      <h1>Thank You!</h1>
      <p>Your order has been sent successfully.</p>
      <button className={styles.button} onClick={navigate("/orderPage")}>Your Order</button>
      
    </div>
  );
}

export default Checkout;