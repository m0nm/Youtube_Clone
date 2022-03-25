export type IVideo = {
  id: { videoId: string } | string;
  statistics: { viewCount: string };
  snippet: {
    localized: {
      title: string;
      description: string;
    };
    title: string;
    description: string;
    channelId: string;
    channelTitle: string;
    publishedAt: string;
    thumbnails: {
      medium: { url: string };
    };
  };
};
