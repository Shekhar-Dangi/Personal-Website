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
          <Link href="https://github.com/Shekhar-Dangi">
            <Image src="/github.png" alt="github logo" width={18} height={18} />
          </Link>

          <Link href="https://www.linkedin.com/in/shekhar-dangi-108b7b242/">
            <Image
              src="/linkedin.webp"
              alt="linkedin logo"
              width={26}
              height={26}
            />
          </Link>
          <Link href="https://twitter.com/shekhar__dangi">
            <Image alt="x logo" src="/x.png" width={18} height={18} />
          </Link>
        </div>
      </div>
      <div className={styles.links}>
        <div className={styles.list}>
          <span className={styles.listTitle}>Navigation</span>
          <Link href="/">Homepage</Link>
          <Link href="/blog">Blog</Link>
          <Link href="mailto:dangishekhar3109@gmail.com">Contact</Link>
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
          <Link href="https://github.com/Shekhar-Dangi">Github</Link>
          <Link href="/">Youtube</Link>
          <Link href="https://www.linkedin.com/in/shekhar-dangi-108b7b242">
            LinkedIn
          </Link>
          <Link href="https://twitter.com/shekhar__dangi">X</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
