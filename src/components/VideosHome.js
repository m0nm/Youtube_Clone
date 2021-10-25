import React, { useContext, useEffect } from "react";
import youtube from "../api/youtube";
import VideoCard from "./VideoCard";
import "./style/VideoCard.css";
import SideBar from "./SideBar";
import { DataContext } from "../App";
import { useHistory } from "react-router-dom";

function VideosHome() {
  const Data = useContext(DataContext);

  // useEffect

  useEffect(() => {
    //  videos grabber
    const videosFetch = async () => {
      const video = await youtube
        .get("search", {
          params: { q: Data.search, regionCode: "RU", chart: "mostPopular" },
        })
        .then((res) => {
          Data.setVideos(res.data.items);
        })
        .catch((err) => {
          if (err.response.status === 403) {
            Data.setError(true);
          }
        });
    };

    videosFetch();
  }, [Data.search]);

  // The Random Videos Array

  // vIDEOS ATTRIBUTES:

  return (
    <div className="videos-home">
      <SideBar />

      <div className="videos-home-video-card-container">
        {Data.videos.map((video) => {
          // vIDEOS ATTRIBUTES:
          const thumbnail = video.snippet.thumbnails.medium.url;
          const title = video.snippet.title;
          const id = video.id.videoId;
          const channelName = video.snippet.channelTitle;
          const description = video.snippet.description;
          const channelId = video.snippet.channelId;
          return (
            <VideoCard
              key={id}
              id={id}
              title={title}
              channelId={channelId}
              channelName={channelName}
              thumbnail={thumbnail}
              description={description}
            />
          );
        })}
      </div>
    </div>
  );
}

export default VideosHome;
