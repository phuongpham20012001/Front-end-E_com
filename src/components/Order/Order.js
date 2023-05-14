import React, { useState, useEffect } from "react";
import axios from "../API/axios";
import styles from "./Order.module.css";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const ORDER_URL = "/order";
  let token = localStorage.getItem("token");
  token = token.replace(/"/g, "");

  useEffect(() => {
    axios
      .get(ORDER_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setOrders(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  if (!orders || orders.length === 0) {
    return <div className={styles.noOrders}>There are no orders.</div>;
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Total Amount</th>
            <th className={styles.th}>Items</th>
            <th className={styles.th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const key = `${order._id.customerId}-${order._id.totalAmount}-${order._id.status}`;
            return (
              <tr key={key}>
                <td className={styles.td}>${order._id.totalAmount.toFixed(2)}</td>
                <td className={styles.td}>
                  <ul className={styles.ul}>
                    {order.items.map((item, index) => (
                      <li key={index} className={styles.li}>
                        <div className={styles.itemContainer}>
                          <img src={item.image} alt={item.name} className={styles.itemImage} />
                          <div className={styles.itemDetails}>
                            <div className={styles.itemName}>{item.name}</div>
                            <div className={styles.itemQuantity}>Quantity: {item.quantity}</div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className={`${styles.td} ${styles[order._id.status.toLowerCase()]}`}>
                  {order._id.status}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Order;
