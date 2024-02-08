"use client";
import Link from "next/link";
import styles from "./authLinks.module.css";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

const AuthLinks = () => {
  const [open, setOpen] = useState(false);
  const { status } = useSession();
  return (
    <>
      {status === "unauthenticated" ? (
        <Link href="/login" className={styles.link}>
          Login
        </Link>
      ) : (
        <>
          <Link href="/write" className={styles.link}>
            Write
          </Link>
          <span className={styles.link} onClick={signOut}>
            Logout
          </span>
        </>
      )}
      <div className={styles.burger} onClick={() => setOpen(!open)}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      {open && (
        <div className={styles.responsiveMenu}>
          <Link onClick={() => setOpen(!open)} href="/">
            Homepage
          </Link>
          <Link
            onClick={() => setOpen(!open)}
            href="mailto:dangishekhar3109@gmail.com"
          >
            Contact
          </Link>
          {status === "unauthenticated" ? (
            <Link onClick={() => setOpen(!open)} href="/login">
              Login
            </Link>
          ) : (
            <>
              <Link onClick={() => setOpen(!open)} href="/write">
                Write
              </Link>
              <span onClick={signOut} className={styles.link}>
                Logout
              </span>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AuthLinks;
