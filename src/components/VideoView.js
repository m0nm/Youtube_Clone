import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./style/VideoView.css";
import queryString from "query-string";
import youtube from "../api/youtube";
import RelatedVideos from "./RelatedVideos";
function VideoView() {
  const location = useLocation();

  const [channelAvatar, setChannelAvatar] = useState([]);
  const [relatedVids, setRelatedVids] = useState([]);

  const parsed = queryString.parse(location.search);

  useEffect(() => {
    // channels function
    const channelsFetcher = async () => {
      // grab channel avatar
      const channel = await youtube
        .get("channels", {
          params: {
            id: `${parsed.channelId}`,
          },
        })
        .then((channel) => {
          setChannelAvatar(
            channel.data.items[0].snippet.thumbnails.default.url
          );
        });
    };

    // relatedVids function
    const relatedVideosFetcher = async () => {
      const relatedVideos = await youtube
        .get("search", {
          params: {
            relatedToVideoId: `${parsed.id}`,
            maxResults: 10,
            type: "video",
          },
        })
        .then((relatedVideo) => {
          console.log(relatedVideo.data.items);
          setRelatedVids(relatedVideo.data.items);
        });
    };

    channelsFetcher();
    relatedVideosFetcher();
  }, []);

  // Handle Related Videos Click:

  let title, thumbnail, channelName, channelId, videoId, description;

  return (
    <div className="video-view">
      {channelAvatar.length > 0 ? (
        <div className="videos-related-container">
          {/* Video Container */}

          <div className="video-section">
            <div className="video-container">
              <iframe
                allowFullScreen
                className="video"
                title="video"
                src={`https://www.youtube.com/embed/${parsed.id}`}
                frameBorder="0"
              ></iframe>
              <h3>{parsed.title}</h3>
              <div className="video-view-channel-details">
                <img
                  className="channel-img"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "100%",
                  }}
                  src={channelAvatar}
                  alt=""
                />
                <h4>{parsed.channel}</h4>
              </div>
              <p>{parsed.description}</p>
            </div>
          </div>
          <div className="related-videos-section">
            {relatedVids.map((relatedVideo) => {
              thumbnail =
                relatedVideo.snippet === undefined
                  ? null
                  : relatedVideo.snippet.thumbnails.medium.url;

              title =
                relatedVideo.snippet === undefined
                  ? null
                  : relatedVideo.snippet.title;

              channelName =
                relatedVideo.snippet === undefined
                  ? null
                  : relatedVideo.snippet.channelTitle;

              channelId =
                relatedVideo.snippet === undefined
                  ? null
                  : relatedVideo.snippet.channelId;

              videoId =
                relatedVideo.snippet === undefined
                  ? null
                  : relatedVideo.id.videoId;

              description =
                relatedVideo.snippet === undefined
                  ? null
                  : relatedVideo.snippet.description;

              return (
                <RelatedVideos
                  key={videoId}
                  title={title}
                  thumbnail={thumbnail}
                  videoId={videoId}
                  channelId={channelId}
                  channelName={channelName}
                  description={description}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <img
          className="loading-gif"
          src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
          alt=""
        />
      )}
    </div>
  );
}

export default VideoView;

// complete related videos section
