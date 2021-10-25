import React, { useContext } from "react";
import SideBar from "./SideBar";
import "./style/SearchResult.css";
import queryString from "query-string";
import { useLocation } from "react-router";
import { DataContext } from "../App";
import VideoCard from "./VideoCard";
function SearchResult() {
  const Data = useContext(DataContext);

  const location = useLocation();
  const parsed = queryString.parse(location.search);

  Data.search = parsed.search;

  return (
    <div className="search-result">
      <SideBar />

      <div className="search-result-videos">
        {Data.videos.map((video) => {
          // vIDEOS ATTRIBUTES:
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
      <div className="search-result-container"></div>
    </div>
  );
}

export default SearchResult;
