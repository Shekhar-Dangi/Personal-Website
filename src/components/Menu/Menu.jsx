import React from "react";
import styles from "./menu.module.css";
import Link from "next/link";
import Image from "next/image";
import MenuPosts from "../menuPosts/menuPosts";
import MenuCategories from "../menuCategories/MenuCategories";

const Menu = ({ page }) => {
  return (
    // Editor's Choice
    <div className={styles.container}>
      <h2 className={styles.subtitle}>Chosen by the editor</h2>
      <h1 className={styles.title}>Editor's Pick</h1>
      <MenuPosts page={page} withImage={false} />
      {/* Discover */}
      <h2 className={styles.subtitle}>Discover by topics</h2>
      <h1 className={styles.title}>Categories</h1>
      <MenuCategories />
      {/* Popular */}
    </div>
  );
};

export default Menu;
