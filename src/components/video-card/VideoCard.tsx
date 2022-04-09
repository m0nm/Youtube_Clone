import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import TimeAgo from "react-timeago";
import ContentLoader from "react-content-loader";

import { numbersFormatter } from "../../../utils/format_numbers_date";
import { useTheme } from "next-themes";
import { useMounted } from "../../hooks/useMounted";
import { IVideoCard } from "../../../interface";
import { SearchCard } from "./search-card/SearchCard";
import { HomeCard } from "./home-card/HomeCard";
import RelatedCard from "./related-card/RelatedCard";

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

function VideoCard({
  title,
  thumbnail,
  desc,
  channelImage,
  channelName,
  date,
  views,
  videoId,
}: IVideoCard) {
  // to display skeleton when loading data
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (views && thumbnail) {
      setLoaded(true);
    }
  }, [views, thumbnail]);

  // format date, ex: "2 days ago"
  const dateFormatted = <TimeAgo date={date as string} />;

  // format the view count, ex: "1000 views" to "1k views"
  const viewsFormatted = numbersFormatter(views);

  // to render either home card, search card or related card based on pathname
  const { pathname, push } = useRouter();

  // send to watch page
  const handleClick = () => {
    push({ pathname: "/watch", query: { v: videoId } });
  };

  return !loaded ? (
    <Skeleton />
  ) : (
    <div onClick={handleClick}>
      {pathname === "/search" ? (
        <SearchCard
          videoId={videoId}
          title={title}
          channelName={channelName}
          channelImage={channelImage}
          thumbnail={thumbnail}
          desc={desc}
          date={dateFormatted}
          views={viewsFormatted}
        />
      ) : pathname === "/watch" ? (
        <RelatedCard
          title={title}
          channelName={channelName}
          thumbnail={thumbnail}
          date={dateFormatted}
          views={viewsFormatted}
        />
      ) : (
        <HomeCard
          videoId={videoId}
          title={title}
          channelName={channelName}
          channelImage={channelImage}
          thumbnail={thumbnail}
          date={dateFormatted}
          views={viewsFormatted}
        />
      )}
    </div>
  );
}

export default VideoCard;
