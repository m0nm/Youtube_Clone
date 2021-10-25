import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import Search from "./AppBar/Search";
import AvatarList from "./AppBar/AvatarList";
import MenuIcon from "@material-ui/icons/Menu";
import logo from "./AppBar/YouTube_Logo.svg";
import "./AppBar/Logo.css";
import { useHistory } from "react-router-dom";
import { DataContext } from "../App";

function AppBar() {
  const history = useHistory();
  const Data = useContext(DataContext);
  const handleBack = () => {
    history.push({
      pathname: "/",
    });
  };
  return (
    <div className="app-bar">
      {/* this is the top bar */}
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <div className="logo-container">
            <MenuIcon style={{ fontSize: "30px" }} />

            <img
              onClick={handleBack}
              className="logo"
              width="90"
              height="20"
              src={logo}
              alt=""
            />
          </div>
        </Grid>

        {/* Search compoenent */}
        <Grid item xs={6}>
          <Search />
        </Grid>
        <Grid item>
          <AvatarList />
        </Grid>
      </Grid>
    </div>
  );
}

export default AppBar;
