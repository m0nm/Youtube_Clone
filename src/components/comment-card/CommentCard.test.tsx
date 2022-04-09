import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import CommentCard from "./CommentCard";

describe("<CommentCard />", () => {
  test("comment card renders correctly", () => {
    const channelImage =
      "https://yt3.ggpht.com/yc8u3QnOyb0iZ4eIumSgQgxRbRt_hgOg_BAwnsV0juT5Z0spruZ0csgwPWZwzD3vx02_7dzA=s88-c-k-c0x00ffffff-no-nd-rj";

    render(
      <CommentCard
        author="google"
        avatar={channelImage}
        date="24 March, 2022"
        comment="hello world"
        likeCount="10"
      />
    );

    // author
    expect(screen.getByText("google")).toBeInTheDocument();

    // date
    expect(screen.getByText(/ago/i)).toBeInTheDocument();

    // comment
    expect(screen.getByText("hello world")).toBeInTheDocument();

    // channe lmg
    waitFor(() => {
      expect(screen.getByAltText("channel image")).toBeInTheDocument();
    });

    // like count
    expect(screen.getByText("10")).toBeInTheDocument();
  });
});
