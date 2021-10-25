import React from "react";
import { useHistory, useLocation } from "react-router";

function VideoCard({
  id,
  channelId,
  description,
  title,
  thumbnail,
  channelName,
}) {
  const history = useHistory();
  const location = useLocation();

  const handleClick = () => {
    history.push({
      pathname: `/video`,
      search: `id=${id}&channel=${channelName}&channelId=${channelId}&title=${title}&description=${description}`,
    });
  };
  return (
    <div
      onClick={handleClick}
      className={`video-card ${
        location.pathname === "/result" && "search-page"
      } `}
    >
      <img
        className="video-card-thumbnail"
        width="100%"
        src={thumbnail}
        alt=""
      />
      <div className="video-card-channel-details">
        <h4 className="video-card-title">{title}</h4>
        <p className="video-card-channel-name">{channelName}</p>
      </div>
    </div>
  );
}

export default VideoCard;
