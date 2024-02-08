import React from "react";
import styles from "./featured.module.css";
import Image from "next/image";
import { Remarkable } from "remarkable";
import Link from "next/link";

const getData = async (page) => {
  const res = await fetch(
    `${
      process.env.NEXTAUTH_URL
    }/api/posts?page=${page}&cat=${""}&featured=${true}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const Featured = async (page) => {
  const { posts } = await getData(page);
  var md = new Remarkable({
    html: true,
  });
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <b className={styles.bold}>Learning Error : </b>{" "}
        <span className={styles.logic}>Logic</span> is{" "}
        <span className={styles.undefined}>undefined</span> at you.
        <span className={styles.brain}>brain</span>
      </h1>
      <div className={styles.post}>
        <div className={styles.imgContainer}>
          <Image src={posts[0].img} fill className={styles.image}></Image>
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.postTitle}>{posts[0].title}</h1>
          <p
            dangerouslySetInnerHTML={{
              __html: md.render(posts[0]?.desc.substring(0, 350)) + "...",
            }}
            className={styles.postDesc}
          ></p>
          <Link href={`/posts/${posts[0]?.slug}`}>
            <button className={styles.button}>Read More</button>{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Featured;
