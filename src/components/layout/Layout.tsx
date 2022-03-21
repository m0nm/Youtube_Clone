import React, { useState } from "react";
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";

import styles from "../../../styles/Layout.module.scss";

function Layout({ children }: { children: JSX.Element }) {
  // for mobile: expand sidebar on menu click
  const [expand, setExpand] = useState(false);

  return (
    <div className={styles.container}>
      <Navbar setExpand={setExpand} />
      <div>
        <Sidebar expand={expand} />
        <main>{children}</main>
      </div>
    </div>
  );
}

export default Layout;
