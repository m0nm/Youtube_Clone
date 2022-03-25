import Image from "next/image";
import React, { useEffect, useState } from "react";
import TimeAgo from "react-timeago";
import { getChannelImage } from "../../../utils/fetch_from_youtube";

import ContentLoader from "react-content-loader";

import styles from "./VideoCard.module.scss";

import spinnerGif from "../../../public/spinner.gif";
import { viewsFormatter } from "../../../utils/format_video_views";
import { useTheme } from "next-themes";
import { useMounted } from "../../hooks/useMounted";

// skeleton when loading data
const Skeleton = () => {
  const { theme } = useTheme();
  const mounted = useMounted();
  const currentTheme = mounted && (theme === "light" ? "light" : "dark");

  return (
    <ContentLoader
      speed={3}
      backgroundColor={currentTheme === "light" ? "#c9c7c7" : "#424242"}
      foregroundColor={currentTheme === "light" ? "#adacac" : "#575757"}
      viewBox="0 0 500 420"
      height={250}
      width={300}
    >
      <rect x="16" y="17" rx="0" ry="0" width="100%" height="250px" />
      <circle cx="45" cy="320" r="35" />
      <rect x="90" y="290" rx="2" ry="2" width="400" height="28" />
      <rect x="90" y="330" rx="2" ry="2" width="240" height="28" />
    </ContentLoader>
  );
};

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
  // to display skeleton when loading data
  const [loaded, setLoading] = useState(false);

  // get the channel image
  const [image, setImage] = useState("");

  useEffect(() => {
    (async () => {
      const channel_image_url: string = await getChannelImage(channelId);

      setImage(channel_image_url);
      setLoading(true);
    })();
  });

  // format date, ex: "2 days ago"
  const dateFormated = <TimeAgo date={date} />;

  // format the view count, ex: "1000 views" to "1k views"
  const viewsFormated = viewsFormatter(views);

  return !loaded ? (
    <Skeleton />
  ) : (
    <div className={styles.card}>
      {/* thumbnail */}
      <div className={styles.thumbnail}>
        <Image src={thumbnail} alt="thumbnail" layout="fill" />
      </div>

      {/* info about video */}
      <div className={styles.detailsSection}>
        {/* channel image */}
        <div className={styles.channelImage}>
          <Image src={image || spinnerGif} alt="" width={42} height={42} />
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
