import React from "react";

import styles from "./Sidebar.module.scss";

import { useTheme } from "next-themes";
import { useMounted } from "../../../hooks/useMounted";
import { useMediaQuery } from "react-responsive";

import { AiFillHome, AiFillLike } from "react-icons/ai";
import { MdSubscriptions } from "react-icons/md";
import { FaDog, FaCat } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";

type ISidebar = {
  expand: boolean;
};

function Sidebar({ expand }: ISidebar) {
  // themz
  const { theme } = useTheme();

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
      <div className={styles.item}>
        <AiFillHome />
        <p>Home</p>
      </div>

      {/* subs */}
      <div className={styles.item}>
        <MdSubscriptions />
        <p>Subscriptions</p>
      </div>

      {/* liked videos */}
      <div className={styles.item}>
        <AiFillLike />
        <p>Liked Videos</p>
      </div>

      {/* cats */}
      <div className={styles.item}>
        <FaCat />
        <p>Cats!</p>
      </div>

      {/* dogs */}
      <div className={styles.item}>
        <FaDog />
        <p>Dogs!</p>
      </div>

      {/* sign button */}
      <span className={styles.signSpan}>
        Sign in to like videos, comment, and subscribe.
      </span>
      <div className={styles.button}>
        <button>
          <FaRegUserCircle />
          SIGN IN
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
