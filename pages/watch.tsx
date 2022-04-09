import Image from "next/image";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React, { Key } from "react";

import { IComment, IVideo } from "../interface";

import {
  getComments,
  getRelatedVideos,
  getVideoById,
} from "../utils/fetch_from_youtube";

import CommentCard from "../src/components/comment-card/CommentCard";
import ShowMoreText from "react-show-more-text";
import VideoCard from "../src/components/video-card/VideoCard";

import { AiOutlineLike } from "react-icons/ai";
import { dateFormatter, numbersFormatter } from "../utils/format_numbers_date";
import styles from "../styles/pages/Watch.module.scss";
// < -------- * -------- >

type IWatch = {
  relatedVideos: IVideo[];
  video: IVideo;
  comments: IComment[];
};

function Watch({ video, relatedVideos, comments }: IWatch) {
  const videoId = typeof video.id === "string" ? video.id : video.id.videoId;
  const title = video.snippet.title || video.snippet.localized.title;
  const channelImage = video.snippet.channelImage;
  const channelName = video.snippet.channelTitle;
  const desc =
    video.snippet?.description || video.snippet?.localized?.description;

  const subscriberCount = numbersFormatter(
    video?.statistics?.subscriberCount as string
  );

  // date formated to mm-dd-yyyy
  const date = dateFormatter(video.snippet.publishedAt);
  // regex expression to add commas seperators
  const views = video.statistics?.viewCount
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // format like count, ex: 1000 to 1k
  const likes = numbersFormatter(video.statistics?.likeCount as string);

  return (
    <div className={styles.container}>
      <Head>
        <title>Youtube Clone | Watch</title>
      </Head>

      {/* watch section */}
      <div className={styles.watchSection}>
        {/* video frame */}
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          allowFullScreen
        ></iframe>

        {/* title */}
        <h1>{title}</h1>

        {/* statistics */}
        <div className={styles.statistics}>
          {/* views - date */}
          <span>
            {views} views • {date}
          </span>

          {/* likes */}
          <div>
            <AiOutlineLike />
            {likes}
          </div>
        </div>

        {/* details */}
        {/* channel and details */}
        <div className={styles.channel}>
          {/* channel image */}
          <div>
            <Image src={channelImage} alt="channel image" layout="fill" />
          </div>

          <div>
            {/* channel name, subscribers count  */}
            <p>{channelName}</p>
            <p>{subscriberCount} subscribers</p>

            {/* desc */}
            <ShowMoreText anchorClass={styles.showMore}>{desc}</ShowMoreText>
          </div>
        </div>

        {/* comment section */}
        <p>Comments</p>
        {comments.map((comment) => {
          const id = comment.id;
          const author =
            comment.snippet.topLevelComment.snippet.authorDisplayName;
          const avatar =
            comment.snippet.topLevelComment.snippet.authorProfileImageUrl;
          const content = comment.snippet.topLevelComment.snippet.textDisplay;
          const date = comment.snippet.topLevelComment.snippet.publishedAt;
          const likeCount = comment.snippet.topLevelComment.snippet.likeCount;

          return (
            <CommentCard
              key={id}
              author={author}
              avatar={avatar}
              comment={content}
              date={date}
              likeCount={likeCount}
            />
          );
        })}
      </div>

      {/* related videos section */}
      <div className={styles.relatedVideos}>
        {relatedVideos.map((video) => {
          if (!video?.snippet && !video?.statistics) return null;

          const id = typeof video.id === "object" && video.id?.videoId;
          const title = video.snippet?.title;
          const channelName = video.snippet?.channelTitle;
          const thumbnail = video.snippet?.thumbnails.medium.url;
          const date = video.snippet?.publishedAt;
          const views = numbersFormatter(video.statistics?.viewCount);

          return (
            <VideoCard
              key={id as Key}
              videoId={id as string}
              title={title}
              channelName={channelName}
              thumbnail={thumbnail}
              date={date}
              views={views}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Watch;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { video } = await getVideoById(query.v as string);

  const relatedVideos = await getRelatedVideos(query.v as string);

  const comments = await getComments(query.v as string);

  // if quotas exceeded
  if (!(video && relatedVideos && comments)) {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
    };
  }

  return {
    props: {
      // json methods to not get server error if fetch results is undefined
      video: JSON.parse(JSON.stringify(video)),
      relatedVideos: JSON.parse(JSON.stringify(relatedVideos)),
      comments: JSON.parse(JSON.stringify(comments)),
    },
  };
};
