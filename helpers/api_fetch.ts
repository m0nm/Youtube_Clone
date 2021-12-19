import axios from "axios";
import { useStore } from "../store/store";

export async function api_fetch(resource: string, config: object) {
  const base_URL = `https://www.googleapis.com/youtube/v3/${resource}`;
  const params = {
    part: "snippet",
    key: process.env.NEXT_PUBLIC_API_KEY,
    maxResults: 20,
    ...config,
  };

  const response = await axios
    .get(base_URL, { params })
    .then((items) => {
      return items.data.items;
    })
    .catch((err) => {
      if (err.responce.status === 403) {
        const setError = useStore((state) => state.setError);
        setError(true);
      } else {
        const setError = useStore((state) => state.setError);
        setError(false);
      }
    });

  return response;
}
