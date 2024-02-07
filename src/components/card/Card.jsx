import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";
import { Remarkable } from "remarkable";

const Card = ({ key, item }) => {
  var md = new Remarkable({
    html: true,
  });
  return (
    <div className={styles.container} key={key}>
      {item.img && (
        <div className={styles.imageContainer}>
          <Image src={item.img} alt="" fill className={styles.image} />
        </div>
      )}
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>
            {item.createdAt.substring(0, 10)} -{" "}
          </span>
          <span className={styles.category}>{item.catSlug}</span>
        </div>
        <Link href={`/posts/${item.slug}`}>
          <h1>{item.title}</h1>
        </Link>
        {/* <p className={styles.desc}>{item.desc.substring(0, 60)}</p> */}
        <p
          dangerouslySetInnerHTML={{
            __html: md.render(item?.desc.substring(0, 150)) + "...",
          }}
          className={styles.postDesc}
        ></p>
        <Link href={`/posts/${item.slug}`} className={styles.link}>
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Card;
