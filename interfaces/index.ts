export type Videos = [
  video: {
    id: { videoId?: string } | string;
    snippet: {
      title: string;
      channelTitle: string;
      channelId: string;
      description: string;
      thumbnails: { medium: { url: string } };
      publishedAt: string;
    };
  }
];

export type Video = {
  title: string;
  channel_name: string;
  channel_id: string;
  description: string;
  thumbnail: string;
  publish_date: string;
  video_id: string;
};
