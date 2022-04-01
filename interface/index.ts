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
    channelImage: string;
    publishedAt: string;
    thumbnails: {
      medium: { url: string };
    };
  };
};

export type IVideoCard = {
  title: string;
  thumbnail: string;
  desc?: string;
  channelName: string;
  channelImage?: string;
  date: string | JSX.Element;
  views: string;
};
