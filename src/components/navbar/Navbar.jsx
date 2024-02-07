import React from "react";
import styles from "./navbar.module.css";
import Link from "next/link";
import AuthLinks from "../authLinks/AuthLinks";
import ThemeToggle from "../themeToggle/ThemeToggle";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.socials}>
        <img src="/github.png" width={24} height={24} />
        <img src="/youtube.png" width={24} height={24} />
        <img src="/linkedin.webp" width={32} height={32} />
      </div>
      <div className={styles.logo}>SD</div>
      <div className={styles.links}>
        <ThemeToggle />
        <Link href="/" className={styles.link}>
          Homepage
        </Link>
        {/* <Link href="/" className={styles.link}>
          Contact
        </Link> */}
        <AuthLinks />
      </div>
    </div>
  );
};

export default Navbar;
