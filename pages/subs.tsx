import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import { getSession, signIn } from "next-auth/react";
import { useTheme } from "next-themes";
import { useMounted } from "../src/hooks/useMounted";
import Head from "next/head";
import Image from "next/image";
import React, { Key, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ContentLoader from "react-content-loader";

import { IVideo } from "../interface";

import { getSubscriptions } from "../utils/fetch_from_youtube";

import styles from "../styles/Subs.module.scss";
import spinnerGif from "../public/spinner.gif";
import subsImage from "../public/subs.png";
import { FaRegUserCircle } from "react-icons/fa";

// < -------- * ------- >
// skeleton when loading data
const Skeleton = () => {
  const { theme } = useTheme();
  const mounted = useMounted();
  const currentTheme = mounted && (theme === "light" ? "light" : "dark");

  return (
    <ContentLoader
      speed={3}
      backgroundColor={currentTheme === "light" ? "#c9c7c7" : "#424242"}
      foregroundColor={currentTheme === "light" ? "#adacac" : "#575757"}
      viewBox="0 0 400 160"
      height={250}
      width={"80%"}
    >
      <circle cx="42" cy="27" r="25" />
      <rect x="75" y="1" rx="0" ry="3" width="201" height="13" />
      <rect x="75" y="25" rx="0" ry="3" width="279" height="30" />
    </ContentLoader>
  );
};

// < -------- * ------- >
type ISubs = {
  session: ISession;
  data: {
    nextPageToken: string;
    items: IVideo[];
  };
};

// < -------- * ------- >
function Subs({ session, data }: ISubs) {
  const { items, nextPageToken } = data || {};
  const [channels, setChannels] = useState<IVideo[]>(items);
  const pageTokenRef = useRef(nextPageToken);

  // to stop fetching once all channels fetched
  const hasMore = useRef(true);

  // if showed all channels
  if (!pageTokenRef.current) {
    hasMore.current = false;
  }

  // < -------- * ------- >
  const { theme } = useTheme();
  const mounted = useMounted();
  // < -------- * ------- >
  // fetch more subscribers (for infinite scroll)
  const fetchMoreChannels = async () => {
    const res = await getSubscriptions(
      session?.accessToken,
      pageTokenRef.current
    );

    pageTokenRef.current = res?.nextPageToken;
    setChannels(channels.concat(await res.items));
  };

  // < -------- * ------- >
  return (
    mounted && (
      <>
        <Head>
          <title>Youtube Clone | Subscriptions</title>
        </Head>

        {!session ? (
          <div
            className={
              theme === "light" ? styles.loginMessage : styles.loginMessageDark
            }
          >
            <Image src={subsImage} alt="" width={120} height={120} />{" "}
            <h1>Don&apos;t miss new videos</h1>
            <p>Sign in to see updates from your favorite YouTube channels</p>
            <button onClick={() => signIn("google")}>
              <FaRegUserCircle />
              SIGN IN
            </button>
          </div>
        ) : (
          <InfiniteScroll
            className={
              theme === "light" ? styles.container : styles.containerDark
            }
            dataLength={channels.length}
            next={fetchMoreChannels}
            hasMore={hasMore.current}
            loader="loadi"
          >
            {channels.map((item) => {
              const id = item.id;
              const channelName = item.snippet.title;
              const channelImage = item.snippet.thumbnails.medium.url;
              const desc = item.snippet.description;

              return !items ? (
                <Skeleton />
              ) : (
                <div className={styles.card} key={id as Key}>
                  {/* channel image */}
                  <div className={styles.channelImage}>
                    <Image
                      src={channelImage || spinnerGif}
                      alt="channel image"
                      layout="fill"
                    />
                  </div>

                  {/* channel details */}
                  <div className={styles.channelDetails}>
                    {/* channel name */}
                    <h3>{channelName}</h3>

                    {/* channel description */}
                    <p>{desc}</p>
                  </div>
                </div>
              );
            })}
          </InfiniteScroll>
        )}
      </>
    )
  );
}

export default Subs;

// < -------- * ------- >
interface ISession extends Session {
  accessToken: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = (await getSession({ req: context.req })) as ISession;

  if (!session) {
    return {
      props: {},
    };
  }

  // fetch subscriptions
  const { accessToken } = session;

  const data = await getSubscriptions(accessToken);

  return {
    props: { session, data },
  };
};
