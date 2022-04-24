import axios from "axios";
import { IVideo } from "../interface";

// Resources
// videos: (get request) fetch a list of videos based on params
// search: (get request) fetch a list of videos based on search query
// channels: (get request) only used to get a channel image :/
// commentThread: (get request) get comments of video

const baseUrl: string = "https://www.googleapis.com/youtube/v3";
const key: string = process.env.NEXT_PUBLIC_YOUTUBE_KEY as string;
const baseParams = {
  key,
  part: "snippet",
  maxResults: 12,
};

// < -------- * --------- >
// fetch the popular videos
export const getPopularVideos = async (
  region: string = "GB",
  page: string | undefined = undefined
) => {
  const params = {
    ...baseParams,
    chart: "mostPopular",
    regionCode: region,
    part: "snippet,statistics",
    pageToken: page,
  };
  try {
    const res = await axios.get(baseUrl + "/videos", { params });

    const { items, nextPageToken } = await res.data;

    const videos = await get_vids_stats_channel_details(items, false);

    return { videos, nextPageToken };
  } catch (error: any) {
    console.log("popularVideos", error.response.data.error);
    return error.response && error.response.status;
  }
};

// < -------- * --------- >
// get single video
export const getVideoById = async (id: string) => {
  const params = {
    ...baseParams,
    id,
    part: "snippet,statistics",
  };

  try {
    const res = await axios.get(baseUrl + "/videos", { params });

    const { items } = await res.data;

    const videosWithChannelImage = await get_vids_stats_channel_details(
      items,
      false
    );
    const video = videosWithChannelImage[0];
    return { video };
  } catch (error: any) {
    console.log("videoById", error.response.data.error);
    return error.response && error.response.status;
  }
};
// < -------- * --------- >
// get related videos of a video
// there is a bug with pagination for related videos
export const getRelatedVideos = async (id: string) => {
  const params = {
    ...baseParams,
    relatedToVideoId: id,
    type: "video",
    maxResults: 20,
  };

  try {
    const res = await axios.get(baseUrl + "/search", { params });
    const { items } = await res.data;

    const videos = await get_vids_stats_channel_details(items, true);

    return videos;
  } catch (error: any) {
    console.log("relatedVideos", error.response?.data.error);
    return error.response && error.response.status;
  }
};

// < -------- * --------- >
// search for videos
export const searchVideos = async (
  query: string | string[] | undefined,
  page: string = ""
) => {
  const params = {
    ...baseParams,
    q: query,
    pageToken: page,
    type: "video",
  };

  try {
    const res = await axios.get(baseUrl + "/search", { params });
    const { items, nextPageToken } = await res.data;

    const videos = await get_vids_stats_channel_details(items, true);

    return { videos, nextPageToken };
  } catch (error: any) {
    console.log("searchVideos", error.response.data.error);
    return error.response && error.response.status;
  }
};

// this is to get videos stats and channel details
// because "searchs, videos" resources doesn't provide statistics or channel image
const get_vids_stats_channel_details = async (
  videos: IVideo[],
  getStatistics: boolean
) => {
  const changedVideos = Promise.all(
    videos.map(async (video: IVideo) => {
      if (!video.snippet) return null;

      // fetch statistics
      if (getStatistics) {
        const videoId = typeof video.id === "object" && video.id.videoId;

        const res = await axios.get(baseUrl + "/videos", {
          params: { ...baseParams, part: "statistics", id: videoId },
        });

        const { items } = await res.data;

        video.statistics = await items[0].statistics;
      }

      // fetch channel image and subscribers count
      const { channelId } = video.snippet;
      const { image, subscriberCount } = await get_channel_details(channelId);

      video.snippet.channelImage = image;

      video.statistics.subscriberCount = subscriberCount;

      return video;
    })
  );

  return changedVideos;
};

// < -------- * --------- >
// Get the channel image and subscribers count
export const get_channel_details = async (channelId: string) => {
  const url = baseUrl + "/channels";
  const params = {
    ...baseParams,
    part: "snippet, statistics",
    id: channelId,
  };

  const res = await axios.get(url, { params });

  const image = await res.data.items[0].snippet.thumbnails.default.url;

  const subscriberCount = await res.data?.items[0]?.statistics?.subscriberCount;

  return { image, subscriberCount };
};

// < -------- * --------- >
// get the list of subscriptions
export const getSubscriptions = async (
  accessToken: string,
  page: string = ""
) => {
  const params = {
    ...baseParams,
    mine: true,
    pageToken: page,
  };

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const res = await axios.get(baseUrl + "/subscriptions", {
      params,
      headers,
    });

    return res.data;
  } catch (error: any) {
    console.log("getSubs", error.response.data.error);
    return error.response && error.response.status;
  }
};

// < -------- * --------- >
// get comments of a video
export const getComments = async (id: string) => {
  const params = {
    ...baseParams,
    videoId: id,
    maxResults: 20,
    order: "relevance",
    textFormat: "plainText",
  };

  try {
    const res = await axios.get(baseUrl + "/commentThreads", { params });

    const { items } = await res.data;

    return items;
  } catch (error: any) {
    console.log("getComments", error.response.data.error);
    return error.response && error.response.status;
  }
};

// < -------- * --------- >
// get channel upload videos
export const getChannelVideos = async (
  channelId: string,
  pageToken: string = ""
) => {
  const channelParams = {
    key,
    part: "snippet,contentDetails,statistics",
    id: channelId,
  };

  try {
    const channelRes = await axios.get(baseUrl + "/channels", {
      params: channelParams,
    });

    const { items } = await channelRes.data;

    // channel title
    const channelName = await items[0].snippet.title;

    // channel image
    const channelImage = await items[0].snippet.thumbnails.high.url;

    // channel subs count
    const { subscriberCount } = await items[0].statistics;

    // playlist id
    const playlistId = await items[0].contentDetails.relatedPlaylists.uploads;

    // get the uploads playlist
    const playlistParams = {
      ...baseParams,
      playlistId,
      pageToken,
    };

    const playlistRes = await axios.get(baseUrl + "/playlistItems", {
      params: playlistParams,
    });

    const videos = await playlistRes.data.items;
    const { nextPageToken } = await playlistRes.data;

    return {
      videos,
      channelName,
      channelImage,
      subscriberCount,
      nextPageToken,
    };
  } catch (error: any) {
    console.log("getChannelVideos", error.response?.data.error);
    return error.response && error.response.status;
  }
};

// < -------- * --------- >
// get deslikes count of a video
// from "returnyoutubedislike.com"
export const getVideoDislikes = async (videoId: string) => {
  const endpoint = "https://returnyoutubedislikeapi.com/votes";

  try {
    const res = await axios.get(endpoint, {
      params: { videoId },
    });

    const { dislikes } = await res.data;

    return dislikes;
  } catch (error: any) {
    console.log("getVideoDislikes", error.response?.data.error);
    return undefined;
  }
};
