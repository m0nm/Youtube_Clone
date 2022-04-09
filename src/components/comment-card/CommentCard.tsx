import Image from "next/image";
import React from "react";
import ReactTimeago from "react-timeago";
import { AiOutlineLike } from "react-icons/ai";
import { numbersFormatter } from "../../../utils/format_numbers_date";

import styles from "./CommentCard.module.scss";
import spinnerGif from "../../../public/spinner.gif";

type ICard = {
  author: string;
  avatar: string;
  date: string;
  comment: string;
  likeCount: string;
};
function CommentCard({ author, avatar, date, comment, likeCount }: ICard) {
  // format date, ex: "3 days ago"
  const dateFormatted = <ReactTimeago title="" date={date} />;

  // formate likes, ex: 1000 to 1k
  const likesFormatted = numbersFormatter(likeCount);
  return (
    <div className={styles.container}>
      {/* channel image */}
      <div className={styles.avatar}>
        <Image
          src={avatar || spinnerGif}
          alt="channel image"
          priority={true}
          layout="fill"
        />
      </div>

      {/* details */}
      <div className={styles.details}>
        {/* author */}
        <span>{author}</span>
        {/* date */}
        <span>{dateFormatted}</span>

        {/* comment */}
        <p>{comment}</p>

        {/* likes */}
        <div className={styles.likes}>
          <AiOutlineLike />
          <span>{likesFormatted}</span>
        </div>
      </div>
    </div>
  );
}

export default CommentCard;
