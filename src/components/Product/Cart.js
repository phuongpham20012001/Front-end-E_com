import React, { useState, useEffect, useContext } from "react";
import axios from "../API/axios";
import styles from "./Cart.module.css";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../Authentication/Context/ShopProvider";
import { CartItem } from "./Cart_item";

export const Cart = () => {
  const { cartItems, getTotalCartAmount, checkOut } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const PRODUCT_URL = "/product";
  useEffect(() => {
    axios
      .get(PRODUCT_URL)
      .then((res) => setProducts(res.data.data)) 
      .catch((err) => console.error(err));
      console.log(products)
  }, []);

  return (
    <div className={styles.cart}>
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className={styles.cart}>
        {products.map((product) => {
          if (cartItems[product._id]) {
            return <CartItem data={product} key={product._id}/>;
            
          }
        })}
      </div>

      {totalAmount > 0 ? (
        <div className={styles.checkout}>
          <p className={styles.total}> Subtotal: ${totalAmount} </p>
          <button onClick={() => navigate("/product")}> Continue Shopping </button>
          <button
            onClick={() => {
              checkOut();
              navigate("/checkout");
            }}
          >
            {" "}
            Checkout{" "}
          </button>
        </div>
      ) : (
        <h1> Your Shopping Cart is Empty</h1>
      )}
    </div>
  );
};
