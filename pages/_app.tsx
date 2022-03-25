import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

import { SessionProvider } from "next-auth/react";
import Layout from "../src/components/layout/Layout";
import React from "react";
import Router from "next/router";
import ErrorMessage from "../src/components/ErrorMessage";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <SessionProvider session={pageProps.session}>
        <ThemeProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </SessionProvider>
    </ErrorBoundary>
  );
}

export default MyApp;

// in case of 403 request error (quota exeeded)
class ErrorBoundary extends React.Component<any, { hasError: boolean }> {
  constructor(props: any) {
    super(props);

    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      <ErrorMessage />;
    }

    // Return children components in case of no error
    return this.props.children;
  }
}
