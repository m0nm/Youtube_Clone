import axios from "axios";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",

  params: {
    part: "snippet",
    key: "AIzaSyCz3m2YO3LMadRH-PrMbh3cARdSFdHtxEI",
    maxResults: 30,
  },
});
