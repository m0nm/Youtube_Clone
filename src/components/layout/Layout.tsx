import React, { useCallback, useState } from "react";
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";

import styles from "../../../styles/pages/Layout.module.scss";

function Layout({ children }: { children: JSX.Element }) {
  // for mobile: expand sidebar on menu click
  const [expand, setExpand] = useState(false);

  const handleSidebarExpand = useCallback(() => setExpand((prev) => !prev), []);

  return (
    <div className={styles.container}>
      <Navbar handleSidebarExpand={handleSidebarExpand} />
      <div>
        <Sidebar expand={expand} />
        <main>{children}</main>
      </div>
    </div>
  );
}

export default Layout;
