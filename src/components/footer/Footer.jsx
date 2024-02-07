import React from "react";
import styles from "./footer.module.css";
import Image from "next/image";
import Link from "next/link";
const getData = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};
const Footer = async () => {
  const data = await getData();
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.logo}>
          <h1 className={styles.logoText}>Shekhar Dangi</h1>
        </div>
        <p className={styles.desc}>
          I love to select a topic and delve into its depths, unraveling its
          layers.I am currently into computer hardware since I got bored just by
          coding without understanding how things actually work. I also study
          Physics & Mathematics since I believe that they are also connected.
        </p>
        <div className={styles.icons}>
          <Image src="/github.png" alt="" width={18} height={18} />
          <Image src="/youtube.png" alt="" width={18} height={18} />
          <Image src="/linkedin.webp" alt="" width={26} height={26} />
        </div>
      </div>
      <div className={styles.links}>
        <div className={styles.list}>
          <span className={styles.listTitle}>Navigation</span>
          <Link href="/">Homepage</Link>
          <Link href="/">Blog</Link>
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Tags</span>
          {data?.map((item) => (
            <Link href={`/blog?cat=${item.slug}`} key={item._id}>
              {item.title}
            </Link>
          ))}
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Social</span>
          <Link href="/">Github</Link>
          <Link href="/">Youtube</Link>
          <Link href="/">LinkedIn</Link>
          <Link href="/">X</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
