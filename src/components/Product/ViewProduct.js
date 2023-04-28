import React, { useState, useEffect, useContext } from "react";
import axios from "../API/axios";
import styles from "./ViewProduct.module.css";
import { Link } from "react-router-dom";
import { ShopContext } from "../Authentication/Context/ShopProvider";
const PRODUCT_URL = "/product";
const Product = ({ product }) => {
  const { addToCart, cartItems } = useContext(ShopContext);
  const cartItemCount = cartItems[product._id];
  
  return (
    <div className={styles.product}>
      <img src={product.image} alt="BigCo Inc. logo" />
      <h3>{product.name}</h3>
      <p> Description: {product.description}</p>
      <p>Price: {product.price}</p>
      <button className={styles.addToCartBttn} onClick={() => addToCart(product._id)}>
      Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
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
      <div className={styles.container}>
        <div className={styles.shopTitle}>
          <h1> Tech Shop</h1>
          <Link to="/cart">Cart</Link>
          
        </div>
      
      </div>

      <div>
        {products ? (
          <div className={styles.products_list}>
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div>Do not have any products</div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
