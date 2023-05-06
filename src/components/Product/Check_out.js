import React from "react";
import styles from "./Check_out.module.css";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate("/order");
  };

  return (
    <div className={styles.page}>
      <h1>Thank You!</h1>
      <p>Your order has been sent successfully.</p>
      <button className={styles.button} onClick={handleOrderClick}>
        Your Order
      </button>
    </div>
  );
}

export default Checkout;
