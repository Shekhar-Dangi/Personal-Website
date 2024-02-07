import React from "react";
import styles from "./menuPosts.module.css";
import Link from "next/link";
import Image from "next/image";

const getData = async (page, cat, editorChoice) => {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/posts?page=${page}&cat=${
      cat || ""
    }&editorChoice=${editorChoice || false}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const MenuPosts = async ({ withImage, page }) => {
  const { posts } = await getData(page, undefined, true);
  return (
    <div className={styles.items}>
      {posts?.map((item) => (
        <Link
          key={item._id}
          href={`/posts/${item.slug}`}
          className={styles.item}
        >
          {withImage && (
            <div className={styles.imageContainer}>
              <Image src="/p1.jpeg" fill className={styles.image} />
            </div>
          )}
          <div className={styles.textContainer}>
            <span className={`${styles.category} ${styles.travel}`}>
              {item.catSlug}
            </span>
            <h3 className={styles.postTitle}>{item.title}</h3>
            <div className={styles.detail}>
              <span className={styles.username}>{item.user.name}</span>
              <span className={styles.date}>
                {" "}
                {item.createdAt.substring(0, 10)}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MenuPosts;
