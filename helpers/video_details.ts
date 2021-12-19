import { Videos } from "../interfaces";

export const video_details = (video: Videos[0]) => {
  const videoObj = {
    title: video.snippet.title,
    channel_name: video.snippet.channelTitle,
    channel_id: video.snippet.channelId,
    description: video.snippet.description,
    thumbnail: video.snippet.thumbnails.medium.url,
    publish_date: video.snippet.publishedAt,
    video_id: video.id,
  };

  if (typeof video.id === "object") {
    return { ...videoObj, video_id: video.id.videoId };
  }

  return videoObj;
};
