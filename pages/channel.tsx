import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { Key, useRef, useState } from "react";
import { getChannelVideos } from "../utils/fetch_from_youtube";
import Timeago from "react-timeago";

import { IPlaylistVideo } from "../interface";

import { numbersFormatter } from "../utils/format_numbers_date";

import styles from "../styles/pages/Channel.module.scss";
import ReactTooltip from "react-tooltip";
import { useTheme } from "next-themes";
import { useMounted } from "../src/hooks/useMounted";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRouter } from "next/router";

type IChannel = {
  channelName: string;
  channelImage: string;
  subscriberCount: string;
  nextPageToken: string;
  videos: IPlaylistVideo[];
};

function Channel({ data }: { data: IChannel }) {
  // theme
  const { theme } = useTheme();
  const mounted = useMounted();

  // data
  const {
    channelName,
    channelImage,
    subscriberCount,
    nextPageToken,
    videos: items,
  } = data;

  // format subs count, ex: 1000 to 1k
  const subsFormatted = numbersFormatter(subscriberCount);

  // for infinite scroll
  const [videos, setVideos] = useState(items);
  const pageTokenRef = useRef(nextPageToken);

  const { query, push } = useRouter();

  const fetchMore = async () => {
    const res = await getChannelVideos(
      query.id as string,
      pageTokenRef.current
    );

    pageTokenRef.current = await res.nextPageToken;
    const newVideos = await res.videos;

    setVideos(videos.concat(newVideos));
  };

  // send to watch page
  const handleClick = (videoId: string) => {
    push({ pathname: "/watch", query: { v: videoId } });
  };

  return (
    mounted && (
      <div className={styles.container}>
        <Head>
          <title>Youtube Clone | Channel</title>
        </Head>
        {/* channel name - subs - image */}
        <div
          className={
            theme === "light"
              ? styles.channelDetails
              : styles.channelDetailsDark
          }
        >
          <div className={styles.channelImage}>
            <Image src={channelImage} alt="channel image" layout="fill" />
          </div>
          <div>
            <h2>{channelName}</h2>
            <p>{subsFormatted} subscribers</p>
          </div>
        </div>
        {/* videos */}
        <div className={styles.videosSection}>
          <p>Uploads</p>
          <InfiniteScroll
            dataLength={videos.length}
            next={fetchMore}
            hasMore={true}
            loader=""
            className={styles.videosContainer}
          >
            {videos.map((video) => {
              const { snippet } = video;
              const videoId = snippet.resourceId.videoId;
              const title = snippet.title;
              const thumbnail = snippet.thumbnails.medium.url;
              const date = <Timeago date={snippet.publishedAt} />;

              return (
                <div
                  key={videoId as Key}
                  onClick={() => handleClick(videoId)}
                  className={styles.videoCard}
                >
                  {/* thumbnail */}
                  <div className={styles.thumbnail}>
                    <Image src={thumbnail} alt="thumbnail" layout="fill" />
                  </div>

                  {/* info about video */}
                  <div className={styles.detailsSection}>
                    {/* title - date */}
                    <div className={styles.details}>
                      <h4 data-tip={title}>{title}</h4>
                      <ReactTooltip
                        place="bottom"
                        delayShow={300}
                        offset={{ bottom: 0, right: 0 }}
                      />

                      <p>{date}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </InfiniteScroll>
        </div>
        ;
      </div>
    )
  );
}

export default Channel;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const data = await getChannelVideos(query.id as string);

  return {
    props: { data },
  };
};
