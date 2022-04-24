import Head from "next/head";
import { GetServerSideProps } from "next";
import React, { Key, useEffect, useRef, useState } from "react";
import { IVideo } from "../interface";
import { searchVideos } from "../utils/fetch_from_youtube";
import VideoCard from "../src/components/video-card/VideoCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRouter } from "next/router";

import styles from "../styles/pages/Search.module.scss";

type ISearch = {
  data: {
    nextPageToken: string;
    videos: IVideo[];
  };
};

function Search({ data }: ISearch) {
  const { videos: items, nextPageToken } = data || {};

  const [videos, setVideos] = useState<IVideo[]>(items);
  const pageTokenRef = useRef(nextPageToken);

  // for next search attempt on same page
  const { query, push } = useRouter();

  useEffect(() => {
    (async () => {
      const res = await searchVideos(query.query);

      // if quotas exeeded
      res === 403 && push("/500");

      pageTokenRef.current = await res.nextPageToken;
      setVideos(await res.videos);
    })();
  }, [query.query]);

  // for infinite sccroll
  const fetchMoreVideos = async () => {
    const res = await searchVideos(query.query, pageTokenRef.current);

    // if quotas exeeded
    res === 403 && push("/500");

    pageTokenRef.current = await res.nextPageToken;
    const newVideos = await res.videos;

    setVideos(videos.concat(newVideos));
  };

  return (
    <>
      <Head>
        <title>Youtube Clone | Search</title>
      </Head>

      {/* if no results found */}
      {!videos?.length ? (
        <div className={styles.container}>
          <h1 style={{ fontSize: "150px" }}>404</h1>
          <h1>No results found</h1>
          <br />
          <p>Try different keywords</p>
        </div>
      ) : (
        <InfiniteScroll
          dataLength={videos.length}
          next={fetchMoreVideos}
          hasMore
          loader=""
          className={styles.container}
        >
          {videos.map((video) => {
            const id = typeof video.id === "object" && video.id.videoId;
            const title = video.snippet.title;
            const thumbnail = video.snippet.thumbnails.medium.url;
            const channelId = video.snippet.channelId;
            const channelName = video.snippet.channelTitle;
            const channelImage = video.snippet.channelImage;
            const date = video.snippet.publishedAt;
            const desc = video.snippet.description;
            const views = video.statistics.viewCount;

            return (
              <VideoCard
                key={id as Key}
                videoId={id as string}
                title={title}
                channelId={channelId as string}
                channelImage={channelImage}
                channelName={channelName}
                thumbnail={thumbnail}
                date={date}
                desc={desc}
                views={views}
              />
            );
          })}
        </InfiniteScroll>
      )}
    </>
  );
}

export default Search;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const data = await searchVideos(query.query as string);

  // if quotas exeeded
  if (data === 403) {
    return {
      redirect: {
        permanent: false,
        destination: "/500",
      },
    };
  }

  return {
    // json methods to not get server error if data is undefined
    props: { data: JSON.parse(JSON.stringify(data)) },
  };
};
