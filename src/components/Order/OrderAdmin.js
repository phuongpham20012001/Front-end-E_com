import React, { useState, useEffect } from "react";
import axios from "../API/axios";
import styles from "./OrderAdmin.module.css";

const ViewOrder = () => {
  const [order, setOrder] = useState([]);
  const ORDER_URL = "/orderadmin";
  let token = localStorage.getItem("token");
  token = token.replace(/"/g, "");

  useEffect(() => {
    axios
      .get(ORDER_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setOrder(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!order.data) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Total Amount</th>
            <th className={styles.th}>Items</th>
            <th className={styles.th}>Status</th>
            <th className={styles.th}>Customer Name</th> {/* Add new table header */}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {order.data.map((order) => (
            <tr key={order._id.customerId}> {/* Use customerId as the key */}
              <td className={styles.td}>{order._id.totalAmount}</td>
              <td className={styles.td}>
                <ul className={styles.ul}>
                  {order.items.map((item, index) => (
                    <li key={index} className={styles.li}>
                      <div className={styles.itemContainer}>
                        <img src={item.image} alt={item.name} className={styles.itemImage} />
                        <div className={styles.itemDetails}>
                          <span className={styles.itemName}>{item.name}</span>
                          <span className={styles.itemQuantity}>Quantity: {item.quantity}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </td>
              <td className={styles.td}>{order._id.status}</td>
              <td className={styles.td}>{order.userName}</td> {/* Display the customer name */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewOrder;
