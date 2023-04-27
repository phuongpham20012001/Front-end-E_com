import React, {  useContext } from "react";
import { ShopContext } from "../Authentication/Context/ShopProvider";
import styles from "./Cart.module.css";
export const CartItem = (props) => {
   
    const { cartItems, addToCart, removeFromCart, updateCartItemCount } =
      useContext(ShopContext);
  
    return (
      <div className={styles.cartItem}>
        <img src={props.data.image} alt="BigCo Inc. logo" />
        <div className="description">
          <p>
            <b>{props.data.name}</b>
          </p>
          <p> Price: ${props.data.price}</p>
          <div className={styles.countHandler}>
            <button onClick={() => removeFromCart(props.data._id)}> - </button>
            <input
              value={cartItems[props.data._id]}
              onChange={(e) => updateCartItemCount(Number(e.target.value), props.data._id)}
            />
            <button onClick={() => addToCart(props.data._id)}> + </button>
          </div>
        </div>
      </div>
    );
  };