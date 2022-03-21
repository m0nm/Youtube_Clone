import axios from "axios";

// Resources
// videos: (get request) fetch a list of videos based on params
// search: (get request) fetch a list of videos based on search query
// channels: (get request) only used to get a channel image :/
// comments: (post request) create a new comment

const baseUrl: string = "https://www.googleapis.com/youtube/v3";
const key: string = process.env.NEXT_PUBLIC_YOUTUBE_KEY as string;

// fetch the popular videos
export const getPopularVideos = async (
  region: string = "GB",
  page: string = ""
) => {
  const url = baseUrl + "/videos";
  const params = {
    key,
    part: "snippet,statistics",
    maxResults: 12,
    chart: "mostPopular",
    regionCode: region,
    pageToken: page,
  };
  try {
    const res = await axios.get(url, { params });

    const { items: videos, nextPageToken } = await res.data;

    return { videos, nextPageToken };
  } catch (error) {
    console.log(error);
  }
};

// get the channel image
export const getChannelImage = async (channelId: string) => {
  const url = baseUrl + "/channels";
  const params = {
    key,
    part: "snippet",
    id: channelId,
  };

  const res = await axios.get(url, { params });

  const image = await res.data.items[0].snippet.thumbnails.default.url;

  return image;
};
