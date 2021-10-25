import React from "react";
import { useHistory } from "react-router";
import "./style/RelatedVideos.css";
function RelatedVideos({
  title,
  thumbnail,
  channelName,
  videoId,
  channelId,
  description,
}) {
  const history = useHistory();

  const handleClick = () => {
    history.push({
      pathname: "/video",
      search: `id=${videoId}&channel=${channelName}&channelId=${channelId}&title=${title}&description=${description}`,
    });
  };

  return (
    <div
      onClick={handleClick}
      className={`related-videos ${
        title === undefined && "related-videos-removed"
      }`}
    >
      <img src={thumbnail} alt="" />
      <div className="related-videos-channel-detail">
        <h3>{title}</h3>
        <p>{channelName}</p>
      </div>
    </div>
  );
}

export default RelatedVideos;
