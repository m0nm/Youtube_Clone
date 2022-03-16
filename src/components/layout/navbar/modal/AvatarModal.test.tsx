import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "../Navbar";
import { setup } from "../../../../../utils/setup_test_render";
import AvatarModal from "./AvatarModal";

describe("<AvatarModal />", () => {
  test("avatar modal renders correctly", () => {
    render(<AvatarModal />);

    expect(screen.getByText(/sign out/i)).toBeInTheDocument();
  });

  test("clicking on avatar render avatar modal", async () => {
    setup(<Navbar setExpand={() => {}} />);

    const avatar = screen.getByTestId(/avatar/i);

    await userEvent.click(avatar);

    expect(screen.getByText(/sign out/i)).toBeInTheDocument();
  });
});
