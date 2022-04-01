import { useRouter } from "next/router";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import TimeAgo from "react-timeago";
import ContentLoader from "react-content-loader";

import styles from "./VideoCard.module.scss";

import spinnerGif from "../../../public/spinner.gif";
import { viewsFormatter } from "../../../utils/format_video_views";
import { useTheme } from "next-themes";
import { useMounted } from "../../hooks/useMounted";
import { IVideoCard } from "../../../interface";

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

// home card if on home page
const HomeCard = (props: IVideoCard) => {
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
          <h4>{props.title}</h4>
          <p>{props.channelName}</p>
          <p>
            {props.views} views • {props.date}
          </p>
        </div>
      </div>
    </div>
  );
};

// search card if on search page
const SearchCard = (props: IVideoCard) => {
  return (
    <div className={styles.searchCard}>
      {/* thumbnail */}
      <div className={styles.thumbnail}>
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
        <h3>{props.title}</h3>

        {/* views - date */}
        <p>
          {props.views} views • {props.date}
        </p>

        {/* channel */}
        <div className={styles.channel}>
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

function VideoCard({
  title,
  thumbnail,
  desc,
  channelImage,
  channelName,
  date,
  views,
}: IVideoCard) {
  // to display skeleton when loading data
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (views && thumbnail && channelImage) {
      setLoaded(true);
    }
  }, [views, thumbnail, channelImage]);

  // format date, ex: "2 days ago"
  const dateFormatted = <TimeAgo date={date as string} />;

  // format the view count, ex: "1000 views" to "1k views"
  const viewsFormatted = viewsFormatter(views);

  // to render either home card, search card or related card based on pathname
  const { pathname } = useRouter();

  return !loaded ? (
    <Skeleton />
  ) : pathname === "/search" ? (
    <SearchCard
      title={title}
      channelName={channelName}
      channelImage={channelImage}
      thumbnail={thumbnail}
      desc={desc}
      date={dateFormatted}
      views={viewsFormatted}
    />
  ) : (
    <HomeCard
      title={title}
      channelName={channelName}
      channelImage={channelImage}
      thumbnail={thumbnail}
      date={dateFormatted}
      views={viewsFormatted}
    />
  );
}

export default VideoCard;
