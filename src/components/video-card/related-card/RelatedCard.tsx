import Image from "next/image";
import React from "react";
import ReactTooltip from "react-tooltip";

import styles from "./RelatedCard.module.scss";

type IRelatedCard = {
  title: string;
  thumbnail: string;
  channelName: string;
  date: JSX.Element | string;
  views: string;
};

function RelatedCard(props: IRelatedCard) {
  return (
    <div className={styles.relatedCard}>
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
}

export default RelatedCard;
