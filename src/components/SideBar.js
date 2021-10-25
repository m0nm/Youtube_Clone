import React, { useContext } from "react";
import HomeIcon from "@material-ui/icons/Home";
import ExploreIcon from "@material-ui/icons/Explore";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import HistoryIcon from "@material-ui/icons/History";
import "./style/SideBar.css";
import { DataContext } from "../App";
import youtube from "../api/youtube";
import { useHistory, useLocation } from "react-router-dom";
function SideBar() {
  // useContext:
  const Data = useContext(DataContext);
  const history = useHistory();
  const location = useLocation();
  // Videos Fetch Function:
  const videosFetch = async (search) => {
    const res = await youtube.get("search", { params: { q: search } });
    history.push({
      pathname: "/result",
    });
    Data.setVideos(res.data.items);
  };

  return (
    <div
      style={{ flex: location.pathname === ("video" || "result") && 0.2 }}
      tabIndex="0"
      className="side-bar"
    >
      <div
        onClick={() => {
          videosFetch("home");
        }}
        tabIndex="1"
        className="side-icon home-icon selected"
      >
        <HomeIcon className="icon" />
        <p>Home</p>
      </div>

      <div
        onClick={() => {
          videosFetch("cat");
        }}
        tabIndex="2"
        className="side-icon explore-icon"
      >
        <ExploreIcon className="icon" />
        <p>Explore</p>
      </div>

      <div
        onClick={() => {
          videosFetch("puppy");
        }}
        tabIndex="3"
        className="side-icon sub-icon"
      >
        <SubscriptionsIcon className="icon" />
        <p>Subscriptions</p>
      </div>

      <div
        onClick={() => {
          videosFetch("Rick Astley - Never Gonne Give You Up");
        }}
        tabIndex="4"
        className="side-icon library-icon"
      >
        <VideoLibraryIcon className="icon" />
        <p>Library</p>
      </div>

      <div
        onClick={() => {
          videosFetch("penguin");
        }}
        tabIndex="5"
        className="side-icon history-icon"
      >
        <HistoryIcon className="icon" />
        <p>History</p>
      </div>
    </div>
  );
}

export default SideBar;
