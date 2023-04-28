import styles from "./Footer.module.css";
import React from 'react';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.title}>Logo</div>
      
      <ul>
        <li><a href="https://www.linkedin.com/in/minh-phuong-pham-24290b222 " target="_blank">LinkedIn</a></li>
        <li><a href="https://github.com/phuongpham20012001" target="_blank">GitHub</a></li>
        <li><a href="https://drive.google.com/file/d/14jgX5Zb_CHnZ044uC4WUCegOJG3C0lP5/view?usp=share_link" target="_blank">CV</a></li>
      </ul>
    </footer>
  );
};

export default Footer;
