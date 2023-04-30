import React, { useState, useEffect } from "react";
import axios from "../API/axios";
import styles from "./ViewProductAdmin.module.css";
const PRODUCT_URL = "/product";
const Product = ({ product }) => {
  return (
    <div className={styles.product}>
      <img src={product.image} alt="BigCo Inc. logo" />
      <h3>{product.name}</h3>
      <p> Description: {product.description}</p>
      <p>Price: {product.price}</p>
    </div>
  );
};

const ProductListAdmin = () => {
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

export default ProductListAdmin;
