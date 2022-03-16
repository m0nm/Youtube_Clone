import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

import Navbar from "../src/components/layout/navbar/Navbar";
import { SessionProvider } from "next-auth/react";
import Sidebar from "../src/components/layout/sidebar/Sidebar";
import { useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  // for mobile: expand sidebar on menu click
  const [expand, setExpand] = useState(false);

  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider>
        <Navbar setExpand={setExpand} />
        <Sidebar expand={expand} />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
