import axios from "axios";

const youtubeInstance = axios.create({
  baseURL: "",
  params: {
    key: process.env.NEXT_PUBLIC_YOUTUBE_KEY,
    part: "snippet",
  },
});

export const youtubeFetcher = async (
  params?: object,
  method?: "get" | "post"
) => {
  switch (method) {
    case "post":
      console.log("post request");
      break;

    default:
      console.log("get request");
      break;
  }
};
