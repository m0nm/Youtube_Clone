import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

import Categories from "../src/components/categories/Categories";
import { getPopularVideos } from "../utils/fetch_from_youtube";
import styles from "../styles/Home.module.scss";
import VideoCard from "../src/components/video-card/VideoCard";
import { IVideo } from "../interface";

type IHome = {
  data: { videos: IVideo[]; nextPageToken: string };
};
const Home = ({ data }: IHome) => {
  // videos, page token
  const { videos, nextPageToken } = data;

  return (
    <>
      <Head>
        <title>Youtube Clone | Home Page</title>
        <meta name="viewport" content="initial-scale=0.9, width=device-width" />
      </Head>

      {/* categories */}
      <Categories />

      {/* videos */}
      <div className={styles.container}>
        {videos.map((video) => {
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
        })}
      </div>
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
