import React, { useState, useEffect } from "react";
import axios from "../API/axios";
import styles from "./ViewProduct.module.css";

const PRODUCT_URL = "/product";

const Product = ({ product }) => {
  const [cart, setCart] = useState([]);
  const savedCart = JSON.parse(localStorage.getItem("cart"));
  const addToCart = () => {
    if (product._id in cart) {
      const updatedQty = cart[product._id].qty + 1;
      const updatedCart = {
        ...cart,
        [product._id]: {
          ...cart[product._id],
          qty: updatedQty,
        },
      };
      
      setCart(updatedCart);
    } else {
      const cartItem = {
        name: product.name,
        price: product.price,
        image: product.image,
        qty: 1,
      };
      const updatedCart = {
        ...cart,
        [product._id]: cartItem,
      };
      
      setCart(updatedCart);
    }
  };
  // console.table(cart);
  useEffect(() => {
    console.log(savedCart)
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div className={styles.product}>
      <img src={product.image} alt="BigCo Inc. logo" />
      <h3>{product.name}</h3>
      <p> Description: {product.description}</p>
      <p>Price: {product.price}</p>
      <button className={styles.addToCartBttn} onClick={addToCart}>
        Add to Cart
      </button>
    </div>
  );
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    
    axios
      .get(PRODUCT_URL)
      .then((res) => setProducts(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <div>
        <div className={styles.shopTitle}>
          <h1> Tech Shop</h1>
        </div>
      </div>

      <div>
        {products ? (
          <div className={styles.products_list}>
            {products.map((product) => (
              <Product key={product._id} product={product} />
              
            ))}
            {/* {savedCart.map((item) => (
              <div key={item._id}>
                <h3>{item.name}</h3>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.qty}</p>
                <img src={item.image} alt={item.name} />
              </div>
            ))} */}
          </div>
        ) : (
          <div>Do not have any products</div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
