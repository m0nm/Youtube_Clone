import React, { useContext, useState } from "react";
import "./Search.css";
import SearchIcon from "@material-ui/icons/Search";
import { DataContext } from "../../App";
import youtube from "../../api/youtube";
import { useHistory } from "react-router-dom";

function Search() {
  // the search input and button inside app bar

  // useStates:
  const [searchInput, setSearchInput] = useState("");
  const Data = useContext(DataContext);

  const history = useHistory();

  // Submit handler:
  const handleSubmit = (e) => {
    e.preventDefault();
    Data.search = searchInput;
    const videosFetch = async () => {
      const res = await youtube.get("search", {
        params: { q: Data.search },
      });
      Data.setVideos(res.data.items);
    };

    history.push({
      pathname: "/result",
      search: `search=${searchInput}`,
    });
    videosFetch();
    setSearchInput("");
  };

  // Search handler
  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };
  return (
    <div className="search-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          placeholder="Search..."
          onChange={handleSearch}
          value={searchInput}
          className="search-input"
        />
        <button className="search-btn">
          <SearchIcon className="search-icon" />
        </button>
      </form>
    </div>
  );
}

export default Search;
