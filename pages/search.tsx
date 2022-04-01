import { GetServerSideProps } from "next";
import React, { Key } from "react";
import { IVideo, IVideoCard } from "../interface";
import { searchVideos } from "../utils/fetch_from_youtube";
import VideoCard from "../src/components/video-card/VideoCard";
import Head from "next/head";

type ISearch = {
  data: {
    nextPageToken: string;
    videos: IVideo[];
  };
};

// just basic styles
const styles = {
  width: "100%",
  display: "flex",
  flexDirection: "column" as "column",
  alignItems: "center",
  paddingTop: "4rem",
};

function Search({ data }: ISearch) {
  const { videos, nextPageToken } = data || {};
  return (
    <>
      <Head>
        <title>Youtube Clone | Search</title>
      </Head>

      {!data ? (
        <div>404</div>
      ) : (
        <div style={styles}>
          {videos.map((video) => {
            const id = typeof video.id === "object" && video.id.videoId;
            const title = video.snippet.title;
            const thumbnail = video.snippet.thumbnails.medium.url;
            const channelName = video.snippet.channelTitle;
            const channelImage = video.snippet.channelImage;
            const date = video.snippet.publishedAt;
            const desc = video.snippet.description;
            const views = video.statistics.viewCount;

            return (
              <VideoCard
                key={id as Key}
                title={title}
                channelImage={channelImage}
                channelName={channelName}
                thumbnail={thumbnail}
                date={date}
                desc={desc}
                views={views}
              />
            );
          })}
        </div>
      )}
    </>
  );
}

export default Search;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const data = await searchVideos(query.query as string);

  return {
    props: { data },
  };
};
