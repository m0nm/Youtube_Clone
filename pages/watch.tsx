import { GetServerSideProps } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";
import VideoCard from "../components/VideoCard";
import { api_fetch } from "../helpers/api_fetch";
import { video_details } from "../helpers/video_details";
import { Videos } from "../interfaces";
import Loading from "../public/loading.gif";
import { useStore } from "../store/store";

function Watch({ relatedVideos }: { relatedVideos: Videos }) {
  // --- hooks -------------------------------------
  const [isLoading, setIsLoading] = useState(true);
  const [videoDetails, setVideoDetails] = useState<any>({});
  const { video, title, channel, channel_img, desc, publish_date } =
    videoDetails;
  const storageTrigger = useStore((state) => state.storageTrigger);
  // --- prevent losing query on refresh ---
  useEffect(() => {
    const storage = JSON.parse(window.sessionStorage.getItem("query")!);
    setVideoDetails(storage);
    setIsLoading(false);
  }, [storageTrigger]);

  // --- return ------------------------------------
  return (
    <Container>
      {/* --- watch section ---*/}
      <div className="watch-section">
        {/* --- video --- */}
        <iframe
          src={`https://www.youtube.com/embed/${video}`}
          frameBorder="0"
          allowFullScreen
        ></iframe>
        {/* --- title & date --- */}
        <div className="title-date">
          <h3>{title}</h3>
          <p>Published at: {publish_date?.slice(0, 10)}</p>
        </div>

        {/* --- channel info */}
        <div className="info-section">
          <div className="channel-info">
            <Image
              src={isLoading ? Loading : (channel_img as string)}
              alt=""
              width="40px"
              height="40px"
            />
            <h4>{channel}</h4>
          </div>

          {/* --- description --- */}
          {/* Can't format the video's description unfortunately. */}
          <p className="description">{desc}</p>
        </div>
      </div>

      {/* --- related videos section ---*/}
      <div className="related-videos-section">
        {relatedVideos.map((video) => {
          if (!video.snippet) {
            return null;
          }
          return (
            <VideoCard
              search
              watch
              video={video_details(video)}
              key={typeof video.id === "object" ? video.id.videoId : video.id}
            />
          );
        })}
      </div>
    </Container>
  );
}

export default Watch;

// --- ssg ------------------------------------
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;

  const respond: Videos = await api_fetch("search", {
    relatedToVideoId: query.video,
    maxResults: 10,
    type: "video",
  });
  return {
    props: {
      relatedVideos: respond,
    },
  };
};

// --- styled ---------------------------------
const Container = styled.div`
  position: absolute;
  top: 15vh;
  left: 8%;
  display: flex;
  width: 91%;
  .watch-section {
    width: 65%;
    display: flex;
    flex-direction: column;

    iframe {
      width: 100%;
      min-height: 460px;
    }

    .title-date {
      margin: 1.5rem 0;
      line-height: 2rem;

      h3 {
        font-weight: 400;
      }
    }

    .info-section {
      .channel-info {
        justify-self: flex-start;
        display: flex;
        align-items: center;
        margin: 1rem 0;
        h4 {
          font-size: 0.9rem;
          margin-left: 0.8rem;
        }

        img {
          border-radius: 100%;
        }
      }

      .description {
        width: 80%;
        margin: 0 auto;
      }
    }
  }

  .related-videos-section {
    width: 35%;
    min-height: 100vh;
    font-size: 0.2rem !important;
  }

  @media only screen and (max-width: 800px) {
    flex-direction: column;
    left: 0;
    align-items: center;
    width: 100%;
    .watch-section {
      width: auto;
      margin-bottom: 3rem;
    }

    .related-videos-section {
      width: 80%;
    }
  }
`;
