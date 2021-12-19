import "../styles/globals.css";
import type { AppProps } from "next/app";
import MobileBar from "../components/MobileBar";
import AppBar from "../components/AppBar";
import SideBar from "../components/SideBar";
import { useMediaQuery } from "react-responsive";
import { useStore } from "../store/store";
import Error403 from "./Error403";

function MyApp({ Component, pageProps }: AppProps) {
  const is_mobile = useMediaQuery({ query: "(max-width: 800px)" });
  const isError = useStore((state) => state.isError);
  return (
    <>
      {is_mobile ? (
        <MobileBar />
      ) : (
        <>
          <AppBar />
          <SideBar />
        </>
      )}
      {isError && <Error403 />}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
