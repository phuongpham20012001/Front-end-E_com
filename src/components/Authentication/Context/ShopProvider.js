import React, { createContext, useEffect, useState } from "react";
import axios from "../../API/axios";
export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const PRODUCT_URL = "/product";
  const ORDER_URL = "/order";
  let token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(PRODUCT_URL)
      .then((res) => setProducts(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  const getDefaultCart = () => {
    let cart = {};
    for (let i = 1; i < products.length + 1; i++) {
      cart[i] = 0;
    }
    return cart;
  };
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item]) {
        let itemInfo = products.find((product) => product._id === item);
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return totalAmount;
  };

  const checkOut = () => {
    token = token.replace(/"/g, "");
    const totalAmount = getTotalCartAmount();
    axios
      .post(
        ORDER_URL,
        {
          totalAmount: totalAmount,
          items: cartItems,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(
        (response) => {
          console.log(response);

          resetContext();
        },
        (error) => {
          console.log(error);
        }
      );
  };
  const resetContext = () => {
    setCartItems(getDefaultCart());
  };
  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  };
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    checkOut,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
