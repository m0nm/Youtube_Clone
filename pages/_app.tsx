import React from "react";
import type { AppProps } from "next/app";

import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import NextNProgress from "nextjs-progressbar";

import Layout from "../src/components/layout/Layout";

import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <NextNProgress
        options={{ showSpinner: false }}
        color="#f11946"
        stopDelayMs={150}
      />
      <ThemeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
