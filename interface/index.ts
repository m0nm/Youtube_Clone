export type IVideo = {
  id: { videoId: string } | string;
  statistics: {
    viewCount: string;
    likeCount?: string;
    subscriberCount?: string;
  };
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
  videoId: string;
  title: string;
  thumbnail: string;
  desc?: string;
  channelName: string;
  channelImage?: string;
  date: string | JSX.Element | Date;
  views: string;
};

export type IComment = {
  id: string;
  snippet: {
    topLevelComment: {
      snippet: {
        authorDisplayName: string;
        authorProfileImageUrl: string;
        textDisplay: string;
        publishedAt: string;
        likeCount: string;
      };
    };
  };
};
