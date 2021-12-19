import styled from "styled-components";
import type { GetStaticProps } from "next";

import { api_fetch } from "../helpers/api_fetch";
import { Videos } from "../interfaces";
import { video_details } from "../helpers/video_details";
import VideoCard from "../components/VideoCard";

const Home = ({ videos }: { videos: Videos }) => {
  return (
    <HomePage>
      <Container>
        {videos.map((video) => {
          return (
            <VideoCard
              search={false}
              watch={false}
              video={video_details(video)}
              key={typeof video.id === "object" ? video.id.videoId : video.id}
            />
          );
        })}
      </Container>
    </HomePage>
  );
};

export default Home;

//--- ssg --------------------------------------------------
export const getStaticProps: GetStaticProps = async () => {
  const respond: Videos = await api_fetch("videos", {
    chart: "mostPopular",
    regionCode: "RU",
  });
  return {
    props: {
      videos: respond,
    },
  };
};

//--- styled ------------------------------------------------

const HomePage = styled.div`
  position: absolute;
  top: 10vh;
  left: 6%;
  width: 91%;
  margin: 0 auto;

  @media only screen and (max-width: 800px) {
    top: 40vh;
    left: 0;
    width: 100%;
    margin: 0 auto;
  }
`;

const Container = styled.div`
  padding: 0 1.2rem;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: flex-start;

  width: 93%;
  margin: 0 auto;

  @media only screen and (max-width: 800px) {
    flex-direction: column;
    justify-content: center;
    width: 100%;
  }
`;
