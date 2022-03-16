import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Context as ResponsiveContext } from "react-responsive";
import userEvent from "@testing-library/user-event";
import Navbar from "./Navbar";
import { setup } from "../../../../utils/setup_test_render";

describe("<Navbar />", () => {
  test("Navbar renders correctly", () => {
    setup(<Navbar setExpand={() => {}} />);

    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  test("navbar input initialized empty", () => {
    setup(
      <ResponsiveContext.Provider value={{ width: "1300" }}>
        <Navbar setExpand={() => {}} />
      </ResponsiveContext.Provider>
    );
    const searchInput = screen.getByRole("textbox");

    expect(searchInput).toHaveValue("");
  });

  test("mobile navbar search input appear on clicking search icon", async () => {
    setup(
      <ResponsiveContext.Provider value={{ width: "700" }}>
        <Navbar setExpand={() => {}} />
      </ResponsiveContext.Provider>
    );

    const searchIcon = screen.getByTitle(/search/i);
    await userEvent.click(searchIcon);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("the sign-in button should be rendered if there is no session", async () => {
    setup(<Navbar setExpand={() => {}} />, false);

    const button = screen.getByRole("button", { name: "SIGN IN" });

    expect(button).toBeInTheDocument();
  });

  test("the sign-in button should NOT be rendered if there is a session", async () => {
    setup(<Navbar setExpand={() => {}} />);

    const button = screen.queryByText("SIGN IN");

    expect(button).not.toBeInTheDocument();
  });
});
