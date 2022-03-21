export type IVideo = {
  id: string;
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
