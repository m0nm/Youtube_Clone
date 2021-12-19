import { GetServerSideProps } from "next";

import styled from "styled-components";
import VideoCard from "../components/VideoCard";
import { api_fetch } from "../helpers/api_fetch";
import { video_details } from "../helpers/video_details";
import { Videos } from "../interfaces";

function Search({ videos }: { videos: Videos }) {
  return (
    <Container>
      {videos.map((video) => {
        return (
          <VideoCard
            watch={false}
            search
            video={video_details(video)}
            key={typeof video.id === "object" ? video.id.videoId : video.id}
          />
        );
      })}
    </Container>
  );
}

export default Search;

//--- ssg ----------------------------------------------

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const respond: Videos = await api_fetch("search", {
    q: query.value,
    type: "video",
  });

  return {
    props: { videos: respond },
  };
};

//--- styled --------------------------------------------

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: absolute;
  top: 18vh;
  left: 8%;
  width: 91%;

  @media only screen and (max-width: 800px) {
    left: 0;
    top: 40vh;
    width: 100%;
  }
`;
