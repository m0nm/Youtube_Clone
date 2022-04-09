import Image from "next/image";
import ReactTooltip from "react-tooltip";
import { IVideoCard } from "../../../../interface";

import styles from "./HomeCard.module.scss";
import spinnerGif from "../../../../public/spinner.gif";

// home card if on home page
export const HomeCard = (props: IVideoCard) => {
  return (
    <div className={styles.card}>
      {/* thumbnail */}
      <div className={styles.thumbnail}>
        <Image
          src={props.thumbnail}
          alt="thumbnail"
          layout="fill"
          quality={100}
        />
      </div>

      {/* info about video */}
      <div className={styles.detailsSection}>
        {/* channel image */}
        <div className={styles.channelImage}>
          <Image src={props.channelImage || spinnerGif} alt="" layout="fill" />
        </div>

        {/* title - channel name - date */}
        <div className={styles.details}>
          <h4 data-tip={props.title}>{props.title}</h4>
          <ReactTooltip
            place="bottom"
            delayShow={300}
            offset={{ bottom: 0, right: 0 }}
          />

          <p>{props.channelName}</p>
          <p>
            {props.views} views • {props.date}
          </p>
        </div>
      </div>
    </div>
  );
};
