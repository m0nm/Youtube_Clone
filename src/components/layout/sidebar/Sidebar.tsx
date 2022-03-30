import Link from "next/link";
import React from "react";

import styles from "./Sidebar.module.scss";

import { signIn, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useMounted } from "../../../hooks/useMounted";
import { useMediaQuery } from "react-responsive";

import { AiFillHome, AiFillLike } from "react-icons/ai";
import { MdSubscriptions } from "react-icons/md";
import { FaDog, FaCat } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
<<<<<<< HEAD
import Link from "next/link";
=======
import { IoMdFootball } from "react-icons/io";

>>>>>>> sidebar
import { useStore } from "../../../store/store";

type ISidebar = {
  expand: boolean;
};

function Sidebar({ expand }: ISidebar) {
  // google oath
  const { data: session } = useSession();

  // theme
  const { theme } = useTheme();

  // this is for cats or dogs item
  const { setCategory } = useStore();

  // check for mobile screens for expandable sidebar
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  // wait for theme hook (check ./hooks)
  return !useMounted() ? null : (
    <aside
      style={
        isTabletOrMobile && expand
          ? {
              display: "block",
              width: "10rem",
              boxShadow: "0 0 0 10000px rgba(0,0,0,0.4)",
            }
          : undefined
      }
      className={theme === "light" ? styles.container : styles.containerDark}
    >
      {/* home */}
      <Link passHref href="/">
        <div onClick={() => window.location.reload()} className={styles.item}>
          <AiFillHome />
          <p>Home</p>
        </div>
      </Link>

      {/* subs */}
      <Link passHref href="/subs">
        <div className={styles.item}>
          <MdSubscriptions />
          <p>Subscriptions</p>
        </div>
      </Link>

      {/* football */}
      <Link passHref href="/">
        <div onClick={() => setCategory("football")} className={styles.item}>
          <IoMdFootball />
          <p>Football</p>
        </div>
      </Link>

      {/* cats */}
      <Link passHref href="/">
        <div onClick={() => setCategory("cats")} className={styles.item}>
          <FaCat />
          <p>Cats!</p>
        </div>
      </Link>

      {/* dogs */}
      <Link passHref href="/">
        <div onClick={() => setCategory("dogs")} className={styles.item}>
          <FaDog />
          <p>Dogs!</p>
        </div>
      </Link>

      {/* sign button */}
      {!session && (
        <>
          <span className={styles.signSpan}>
            Sign in to like videos, comment, and subscribe.
          </span>

          <div className={styles.button}>
            <button onClick={() => signIn("google")}>
              <FaRegUserCircle />
              SIGN IN
            </button>
          </div>
        </>
      )}
    </aside>
  );
}

export default Sidebar;
