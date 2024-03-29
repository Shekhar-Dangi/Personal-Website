import CardList from "@/components/cardList/CardList";
import styles from "./page.module.css";
import Menu from "@/components/Menu/Menu";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const BlogPage = ({ searchParams }) => {
  const page = searchParams.page ? parseInt(searchParams?.page) : 1;
  const { cat } = searchParams;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <CardList page={page} cat={cat} />
        <Menu />
      </div>
    </div>
  );
};

export default BlogPage;
