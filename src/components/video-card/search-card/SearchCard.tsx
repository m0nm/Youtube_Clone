import Image from "next/image";
import { IVideoCard } from "../../../../interface";

import styles from "./SearchCard.module.scss";

import spinnerGif from "../../../../public/spinner.gif";

// search card if on search page
export const SearchCard = (props: IVideoCard) => {
  return (
    <div className={styles.searchCard}>
      {/* thumbnail */}
      <div onClick={props.handleWatch} className={styles.thumbnail}>
        <Image
          src={props.thumbnail}
          alt="thumbnail"
          layout="fill"
          quality={100}
        />
      </div>

      {/* details */}
      <div className={styles.details}>
        {/* title */}
        <h3 onClick={props.handleWatch}>{props.title}</h3>

        {/* views - date */}
        <p>
          {props.views} views • {props.date}
        </p>

        {/* channel */}
        <div onClick={props.handleChannel} className={styles.channel}>
          {/* channel Image */}
          <Image
            src={(props.channelImage as string) || spinnerGif}
            alt="channel image"
            width={20}
            height="20"
          />

          {/* channel name */}
          <span>{props.channelName}</span>
        </div>

        {/* desc */}
        <p className={styles.desc}>{props.desc}</p>
      </div>
    </div>
  );
};
