"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { app } from "@/utils/firebase";
import Editor from "@/components/editor/Editor";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const WritePage = () => {
  const { status, data } = useSession();
  const router = useRouter();

  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("");

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (
    status === "unauthenticated" ||
    data.user.email !== process.env.NEXT_PUBLIC_AUTH_EMAIL
  ) {
    router.push("/");
  }

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleSubmit = async () => {
    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        desc: value,
        img: media,
        slug: slugify(title),
        catSlug: catSlug || "style", //If not selected, choose the general category
      }),
    });

    if (res.status === 200) {
      const data = await res.json();
      router.push(`/posts/${data.slug}`);
    }
  };

  return (
    <div className={styles.container}>
      <Editor
        value={value}
        setValue={setValue}
        handleSubmit={handleSubmit}
        title={title}
        setTitle={setTitle}
      />
    </div>
  );
};

export default WritePage;
