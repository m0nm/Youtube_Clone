import { useEffect, useRef, useState } from "react";
import Head from "next/head";

import Categories from "../src/components/categories/Categories";
import VideoCard from "../src/components/video-card/VideoCard";
import InfiniteScroll from "react-infinite-scroll-component";

import { useStore } from "../src/store/store";
import { getPopularVideos, searchVideos } from "../utils/fetch_from_youtube";

import { IVideo } from "../interface";

import styles from "../styles/pages/Home.module.scss";
import Router from "next/router";

const Home = () => {
  // < -------- * -------- >
  // videos, page token
  const [videos, setVideos] = useState([]);
  const pageTokenRef = useRef("");

  // < -------- * -------- >
  // show category videos
  const { category, setCategory } = useStore();

  useEffect(() => {
    // this is to cancel request if user clicks on another category before fetching is finished
    let mounted = true;

    const fetchVideos = async () => {
      let data = [];

      // if the active category is "All" then get the popular videos

      if (category === "All") {
        data = await getPopularVideos();
        pageTokenRef.current = data?.nextPageToken;
        mounted && setVideos(await data?.videos);

        // if quotas exeeded
        data === 403 && Router.push("/500");

        return false;
      }

      // search by category keyword
      data = await searchVideos(category);
      mounted && setVideos(await data?.videos);
      pageTokenRef.current = data?.nextPageToken;

      // if quotas exeeded
      data === 403 && Router.push("/500");
    };

    fetchVideos();

    return () => {
      mounted = false;
    };
  }, [category]);

  // < -------- * -------- >
  // fetch more videos (for infinite scroll)
  const fetchMoreVideos = async () => {
    // more popular videos
    if (category === "All") {
      const res = await getPopularVideos(undefined, pageTokenRef.current);
      const newVideos = await res?.videos;

      setVideos(videos.concat(newVideos));
      pageTokenRef.current = res?.nextPageToken;

      // if quotas exeeded
      res === 403 && Router.push("/500");

      return false;
    }

    // more category videos
    const res = await searchVideos(category, pageTokenRef.current);

    // if quotas exeeded
    res === 403 && Router.push("/500");

    setVideos(videos.concat(await res?.videos));
    pageTokenRef.current = res?.nextPageToken;
  };

  // < -------- * -------- >
  // render popular or categorized videos
  const renderVideos = () => {
    if (!videos) return null;

    return videos.map((video: IVideo) => {
      const id = typeof video.id === "string" ? video.id : video.id.videoId;
      const title = video.snippet.title || video.snippet.localized.title;
      const channelId = video.snippet.channelId;
      const channelImage = video.snippet.channelImage;
      const channelName = video.snippet.channelTitle;
      const thumbnail = video.snippet.thumbnails.medium.url;
      const date = video.snippet.publishedAt;
      const desc =
        video.snippet?.description || video.snippet?.localized?.description;

      const views = video.statistics?.viewCount;
      return (
        <VideoCard
          key={id}
          videoId={id}
          title={title}
          channelId={channelId}
          channelImage={channelImage}
          channelName={channelName}
          thumbnail={thumbnail}
          date={date}
          desc={desc}
          views={views}
        />
      );
    });
  };
  // < -------- * -------- >
  return (
    <>
      <Head>
        <title>Youtube Clone | Home Page</title>
        <meta name="viewport" content="initial-scale=0.9, width=device-width" />
      </Head>

      {/* categories */}
      <Categories category={category} setCategory={setCategory} />

      {/* videos */}
      <InfiniteScroll
        className={styles.container}
        dataLength={videos?.length}
        next={fetchMoreVideos}
        hasMore={true}
        loader=""
      >
        {renderVideos()}
      </InfiniteScroll>
    </>
  );
};

export default Home;
