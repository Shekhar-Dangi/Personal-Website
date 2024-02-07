import Link from "next/link";
import React from "react";
import styles from "./menucategories.module.css";

function getRandomGradient() {
  const gradients = [
    "#57c4ff31",
    "#da85c731",
    "#7fb88133",
    "#ff795736",
    "#ffb04f45",
    "#5e4fff31",
  ];
  const randomIndex = Math.floor(Math.random() * gradients.length);
  return gradients[randomIndex];
}

const getData = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const MenuCategories = async () => {
  const data = await getData();
  return (
    <div className={styles.categoryList}>
      {data?.map((item) => (
        <Link
          key={item._id}
          style={{ background: getRandomGradient() }}
          href={`/blog?cat=${item.slug}`}
          className={styles.categoryItem}
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
};

export default MenuCategories;
