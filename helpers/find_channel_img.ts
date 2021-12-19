import { api_fetch } from "./api_fetch";

export async function find_channel_img(channel_id: string) {
  const respond = await api_fetch("channels", {
    id: channel_id,
  })
    .then((item) => {
      return item[0].snippet.thumbnails.default.url;
    })
    .catch((err) => console.log(err));

  return respond;
}
