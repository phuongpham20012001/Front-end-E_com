import React, { useState, useEffect } from "react";
import axios from "../API/axios";
import styles from "./Order.module.css";
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
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.th}>Total Amount</th>
          <th className={styles.th}>Items</th>
          <th className={styles.th}>Status</th>
        </tr>
      </thead>
      <tbody>
        {order.data.map((order) => (
          <tr key={order._id}>
            <td className={styles.td}>{order.totalAmount}</td>
            <td className={styles.td}>
              <ul className={styles.ul}>
                {Object.entries(order.items).map(([key, value]) => (
                  <li key={key} className={styles.li}>
                    {value}
                  </li>
                ))}
              </ul>
            </td>
            <td className={styles.td}>{order.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ViewOrder;
