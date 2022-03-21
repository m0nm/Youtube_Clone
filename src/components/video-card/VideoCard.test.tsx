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
      />
    );

    // title
    expect(screen.getByText("funny cat video")).toBeInTheDocument();

    // channel
    expect(screen.getByText("daily cat")).toBeInTheDocument();
  });
});
