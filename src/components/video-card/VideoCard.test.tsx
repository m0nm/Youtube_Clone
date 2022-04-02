import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import VideoCard from "./VideoCard";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
    };
  },
}));

describe("<VideoCard />", () => {
  test("VideoCard renders correctly", () => {
    render(
      <VideoCard
        desc="some-desc"
        thumbnail="some-thumbnail"
        date="Mar 23, 2022"
        title="funny cat video"
        channelName="daily cat"
        channelImage="5grt13za"
        views="4000"
      />
    );

    // title
    expect(screen.getByText("funny cat video")).toBeInTheDocument();

    // channel
    expect(screen.getByText("daily cat")).toBeInTheDocument();

    // views
    expect(screen.getByText(/4k/i)).toBeInTheDocument();

    // date
    expect(screen.getByText(/ago/i)).toBeInTheDocument();
  });
});
