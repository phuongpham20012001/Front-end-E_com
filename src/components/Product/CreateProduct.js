import React, { useRef, useState, useEffect } from "react";
import styles from "./CreateProduct.module.css";
import axios from "../API/axios";
import BeatLoader from "react-spinners/BeatLoader";
function ImageUploader() {
  const PRODUCT_URL = "/product";
  const userRef = useRef();
  const errRef = useRef();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  let [loading, setLoading] = useState(false);
  let token = localStorage.getItem("token");
  const override = {
    margin: "0 auto",
  };
  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [name]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image", image);
    try {
      token = token.replace(/"/g, "");
      await axios.post(PRODUCT_URL, formData,
        {
          headers: {
           
            Authorization: `Bearer ${token}`,
          },
        }
        );

      setSuccess(true);
    } catch (err) {
      console.log(err.response.data.message);
      if (err.response) {
        setErrMsg(err.response.data.message);
      }
      errRef.current.focus();
    }
  };

  return (
    <div>
      {success ? (
        <section>The product has been uploaded successfully.</section>
      ) : (
        <div>
          <section className={styles.form}>
            <p ref={errRef} className={styles.errmsg} aria-live="assertive">
              {errMsg}
            </p>
            <h1 className={styles.h1}>Create Product</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Product name:</label>
              <input
                type="text"
                id="name"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                required
              />
              <label htmlFor="price">Price:</label>
              <input
                type="text"
                id="price"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                required
              />
              <label htmlFor="file">Image:</label>
              <input
                type="file"
                name="file"
                accept=".png, .jpg, .jpeg"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setImage(e.target.files[0])}
                files={image}
                required
              />
              <button onClick={() => setLoading(!loading)}>Send</button>
              <BeatLoader
                color="#060707"
                cssOverride={override}
                loading={loading}
              />
            </form>
          </section>
        </div>
      )}
    </div>
  );
}
export default ImageUploader;
