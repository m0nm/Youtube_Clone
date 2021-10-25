import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

import AppBar from "./components/AppBar";
import Error403 from "./components/Error403";
import SearchResult from "./components/SearchResult";

import VideosHome from "./components/VideosHome";
import VideoView from "./components/VideoView";

// CONTEXT:

export const DataContext = React.createContext(null);
function App() {
  const [search, setSearch] = useState("");
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(false);

  return (
    <DataContext.Provider
      value={{ search, setSearch, videos, setVideos, setError }}
    >
      <Router>
        {error ? (
          <Error403 />
        ) : (
          <div className="App">
            <AppBar />
            <Switch>
              <Route path="/" exact component={VideosHome} />
              <Route path="/video" exact component={VideoView} />
              <Route path="/result" exact component={SearchResult} />
            </Switch>
          </div>
        )}
      </Router>
    </DataContext.Provider>
  );
}

export default App;
