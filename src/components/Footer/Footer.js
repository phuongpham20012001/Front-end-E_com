import styles from "./Footer.module.css";
import React from 'react';
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.title}>Logo</div>
      <ul className="ul">
        <li>Support</li>
        <li>Contact</li>
        <li>Term And Services</li>
      </ul>
      <ul>
        <li>LinkedIn</li>
        <li>GitHub</li>
        <li>CV</li>
      </ul>
    </footer>
  );
};
export default Footer;
