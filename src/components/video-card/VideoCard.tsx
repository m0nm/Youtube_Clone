import Image from "next/image";
import React, { useEffect, useState } from "react";
import TimeAgo from "react-timeago";
import { getChannelImage } from "../../../utils/fetch_from_youtube";

import styles from "./VideoCard.module.scss";

import spinnerGif from "../../../public/spinner.gif";
import { viewsFormatter } from "../../../utils/format_video_views";

type IVideoCard = {
  title: string;
  thumbnail: string;
  desc: string;
  channelId: string;
  channelName: string;
  date: string;
  views: string;
};

function VideoCard({
  title,
  thumbnail,
  desc,
  channelId,
  channelName,
  date,
  views,
}: IVideoCard) {
  // get the channel image
  const [image, setImage] = useState("");

  useEffect(() => {
    (async () => {
      const channel_image_url: string = await getChannelImage(channelId);

      setImage(channel_image_url);
    })();
  });

  // format date, ex: "2 days ago"
  const dateFormated = <TimeAgo date={date} />;

  // format the view count, ex: "1000 views" to "1k views"
  const viewsFormated = viewsFormatter(views);

  return (
    <div className={styles.card}>
      {/* thumbnail */}
      <div className={styles.thumbnail}>
        <Image src={thumbnail} alt="thumbnail" layout="fill" />
      </div>

      {/* info about video */}
      <div className={styles.detailsSection}>
        {/* channel image */}
        <div className={styles.channelImage}>
          <Image src={image || spinnerGif} alt="" layout="fill" />
        </div>

        {/* title - channel name - date */}
        <div className={styles.details}>
          <h4>{title}</h4>
          <p>{channelName}</p>
          <p>
            {viewsFormated} views • {dateFormated}
          </p>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
