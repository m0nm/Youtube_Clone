import { useTheme } from "next-themes";
import React, { useState } from "react";
import classNames from "classNames";
import ScrollContainer from "react-indiana-drag-scroll";

import styles from "./Categories.module.scss";
import { useMounted } from "../../hooks/useMounted";

const keywords = [
  "All",
  "Cat",
  "Dog",
  "Puppies",
  "funny cats",
  "Tom and Jerry",
  "React",
  "Nextjs",
  "Vue",
  "PHP",
  "Traversy Media",
  "Web Deb Simplified",
  "Counter Strike: Global Offensive",
  "Valorant",
  "Call Of Duty",
  "Music",
  "MrBeast",
];

function Categories() {
  // theme
  const { theme } = useTheme();

  // style active element
  const [active, setActive] = useState("All");
  const handleClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    setActive(e.currentTarget.innerText);
  };

  return !useMounted() ? null : (
    <ScrollContainer
      className={theme === "light" ? styles.container : styles.containerDark}
    >
      {keywords.map((keyword, i) => {
        const isActive: boolean = active === keyword;
        return (
          <span
            key={i}
            onClick={handleClick}
            className={classNames(styles.keyword, isActive && styles.active)}
          >
            {keyword}
          </span>
        );
      })}
    </ScrollContainer>
  );
}

export default Categories;
