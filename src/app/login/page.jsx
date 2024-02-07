"use client";
import React from "react";
import styles from "./page.module.css";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const page = () => {
  const { data, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (status === "authenticated") {
    router.push("/");
  }

  console.log(data, status);
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.socialButton} onClick={() => signIn("google")}>
            Sign in with Google
          </div>
          <div className={styles.socialButton}>Sign in with Github</div>
        </div>
      </div>
    </div>
  );
};

export default page;
