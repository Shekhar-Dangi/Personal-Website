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
        <Link href={"https://github.com/Shekhar-Dangi"}>
          <img src="/github.png" width={24} height={24} />
        </Link>

        <Link href="https://www.linkedin.com/in/shekhar-dangi-108b7b242/">
          <img src="/linkedin.webp" width={32} height={32} />
        </Link>
        <Link href="https://twitter.com/shekhar__dangi">
          <img src="/x.png" width={24} height={24} />
        </Link>
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
