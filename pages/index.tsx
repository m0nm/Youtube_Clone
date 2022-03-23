import type { GetServerSideProps, NextPage } from "next";
import { ReactNode, useRef, useState } from "react";
import Head from "next/head";

import Categories from "../src/components/categories/Categories";
import VideoCard from "../src/components/video-card/VideoCard";
import InfiniteScroll from "react-infinite-scroll-component";

import { getPopularVideos } from "../utils/fetch_from_youtube";

import { IVideo } from "../interface";

import styles from "../styles/Home.module.scss";

type IHome = {
  data: { items: IVideo[]; nextPageToken: string };
};
const Home = ({ data }: IHome) => {
  // videos, page token
  let { items, nextPageToken } = data;
  const [videos, setVideos] = useState(items);
  const pageTokenRef = useRef(nextPageToken);

  // fetch more popular videos (for infinite scroll)
  const fetchMoreVideos = async () => {
    const res = await getPopularVideos(undefined, pageTokenRef.current);
    const newVideos = await res?.items;

    setVideos(videos.concat(newVideos));
    pageTokenRef.current = res?.nextPageToken;
  };

  // render popular videos
  const renderPopularVideos = () => {
    return videos.map((video: IVideo) => {
      const id = video.id;
      const title = video.snippet.title || video.snippet.localized.title;
      const channelId = video.snippet.channelId;
      const channelName = video.snippet.channelTitle;
      const thumbnail = video.snippet.thumbnails.medium.url;
      const date = video.snippet.publishedAt;
      const desc =
        video.snippet.description || video.snippet.localized.description;

      const views = video.statistics.viewCount;
      return (
        <VideoCard
          key={id}
          title={title}
          channelId={channelId}
          channelName={channelName}
          thumbnail={thumbnail}
          date={date}
          desc={desc}
          views={views}
        />
      );
    });
  };

  return (
    <>
      <Head>
        <title>Youtube Clone | Home Page</title>
        <meta name="viewport" content="initial-scale=0.9, width=device-width" />
      </Head>

      {/* categories */}
      <Categories />

      {/* videos */}
      <InfiniteScroll
        className={styles.container}
        dataLength={videos.length}
        next={fetchMoreVideos}
        hasMore={true}
        loader=""
      >
        {renderPopularVideos()}
      </InfiniteScroll>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await getPopularVideos();

  return {
    props: { data },
  };
};
