import axios, { AxiosError } from "axios";
import { IVideo } from "../interface";

// Resources
// videos: (get request) fetch a list of videos based on params
// search: (get request) fetch a list of videos based on search query
// channels: (get request) only used to get a channel image :/
// comments: (post request) create a new comment

const baseUrl: string = "https://www.googleapis.com/youtube/v3";
const key: string = process.env.NEXT_PUBLIC_YOUTUBE_KEY as string;
const baseParams = {
  key,
  part: "snippet",
  maxResults: 6,
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

    const videos = await get_Videos_Stats_And_ChannelImg(items, false);

    return { videos, nextPageToken };
  } catch (error: any) {
    console.log(error.response.data.error);
    return error.response && error.response.status;
  }
};

// < -------- * --------- >
// search for videos
export const searchVideos = async (
  query: string | string[] | undefined,
  page: string = ""
) => {
  let params = {
    ...baseParams,
    q: query,
    pageToken: page,
    type: "video",
  };

  try {
    const res = await axios.get(baseUrl + "/search", { params });
    const { items, nextPageToken } = await res.data;

    const videos = await get_Videos_Stats_And_ChannelImg(items, true);

    return { videos, nextPageToken };
  } catch (error: any) {
    console.log(error.response.data.error);
    return error.response && error.response.status;
  }
};

// this is to get videos statistics and channel image (views) because "searchs, videos" resources doesn't provide statistics
const get_Videos_Stats_And_ChannelImg = async (
  videos: IVideo[],
  getStatistics: boolean
) => {
  const changedVideos = Promise.all(
    videos.map(async (video: IVideo) => {
      // fetch statistics
      if (getStatistics) {
        const videoId = typeof video.id === "object" && video.id.videoId;

        const res = await axios.get(baseUrl + "/videos", {
          params: { ...baseParams, part: "statistics", id: videoId },
        });

        const { items } = await res.data;

        video.statistics = await items[0].statistics;
      }

      // fetch channel image
      const { channelId } = video.snippet;
      const channelImage = await get_Channel_Image(channelId);

      video.snippet.channelImage = channelImage;

      return video;
    })
  );

  return changedVideos;
};

// < -------- * --------- >
// Get the channel image
export const get_Channel_Image = async (channelId: string) => {
  const url = baseUrl + "/channels";
  const params = {
    ...baseParams,
    id: channelId,
  };

  const res = await axios.get(url, { params });

  const image = await res.data.items[0].snippet.thumbnails.default.url;

  return image;
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
    console.log(error.response.data.error);
    return error.response && error.response.status;
  }
};
