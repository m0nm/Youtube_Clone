import { useTheme } from "next-themes";
import React, { SetStateAction, useState } from "react";
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

type ICategories = {
  category: string;
  setCategory: React.Dispatch<SetStateAction<string>>;
};

function Categories({ category, setCategory }: ICategories) {
  // theme
  const { theme } = useTheme();

  const handleClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const keyword = e.currentTarget.innerText;
    setCategory(keyword);
  };

  return !useMounted() ? null : (
    <ScrollContainer
      className={theme === "light" ? styles.container : styles.containerDark}
    >
      {keywords.map((keyword, i) => {
        // style the active keyword
        const isActive: boolean = category === keyword;
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
