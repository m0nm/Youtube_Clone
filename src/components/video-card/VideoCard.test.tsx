import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import VideoCard from "./VideoCard";

describe("<VideoCard />", () => {
  test("VideoCard renders correctly", () => {
    render(
      <VideoCard
        desc=""
        thumbnail=""
        date=""
        title="funny cat video"
        channelName="daily cat"
        channelId="5grt13za"
        views="4000"
      />
    );

    // title
    expect(screen.getByText("funny cat video")).toBeInTheDocument();

    // channel
    expect(screen.getByText("daily cat")).toBeInTheDocument();
  });

  test("view count and date formated correctly", () => {
    render(
      <VideoCard
        desc=""
        thumbnail=""
        title=""
        channelName=""
        channelId=""
        date="Mar 23, 2022"
        views="4000"
      />
    );

    expect(screen.getByText(/4k/i)).toBeInTheDocument();
    expect(screen.getByText(/3 days ago/i)).toBeInTheDocument();
  });
});
