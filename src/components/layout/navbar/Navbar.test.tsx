import React from "react";
import { screen, waitFor } from "@testing-library/react";
import { Context as ResponsiveContext } from "react-responsive";
import userEvent from "@testing-library/user-event";
import Navbar from "./Navbar";
import { setup } from "../../../../utils/setup_test_render";

describe("<Navbar />", () => {
  test("Navbar renders correctly", () => {
    setup(<Navbar handleSidebarExpand={() => {}} />);

    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  test("navbar input initialized empty", () => {
    setup(
      <ResponsiveContext.Provider value={{ width: "1300" }}>
        <Navbar handleSidebarExpand={() => {}} />
      </ResponsiveContext.Provider>
    );
    const searchInput = screen.getByRole("textbox");

    expect(searchInput).toHaveValue("");
  });

  test("navbar input onchange", async () => {
    setup(
      <ResponsiveContext.Provider value={{ width: "1300" }}>
        <Navbar handleSidebarExpand={() => {}} />
      </ResponsiveContext.Provider>
    );

    const searchInput = screen.getByRole("textbox");

    await userEvent.type(searchInput, "hello world");

    expect(searchInput).toHaveValue("hello world");
  });

  test("mobile navbar search input appear on clicking search icon", async () => {
    setup(
      <ResponsiveContext.Provider value={{ width: "700" }}>
        <Navbar handleSidebarExpand={() => {}} />
      </ResponsiveContext.Provider>
    );

    const searchIcon = screen.getByTitle(/search/i);
    await userEvent.click(searchIcon);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("the sign-in button should be rendered if there is no session", async () => {
    setup(<Navbar handleSidebarExpand={() => {}} />, false);

    const button = screen.getByRole("button", { name: "SIGN IN" });

    expect(button).toBeInTheDocument();
  });

  test("the sign-in button should NOT be rendered if there is a session", async () => {
    setup(<Navbar handleSidebarExpand={() => {}} />);

    const button = screen.queryByText("SIGN IN");

    expect(button).not.toBeInTheDocument();
  });

  test("navbar logo renders correctly on dark theme", () => {
    // on dark theme
    setup(<Navbar handleSidebarExpand={() => {}} />, undefined, "dark");

    waitFor(async () => {
      const logo = await screen.getByAltText(/youtube logo dark/i);
      expect(logo).toBeInTheDocument();
    });
  });

  test("navbar logo renders correctly on light theme", () => {
    // on light theme
    setup(<Navbar handleSidebarExpand={() => {}} />, undefined, "light");

    waitFor(async () => {
      const logo = await screen.queryByAltText(/youtube logo dark/i);
      expect(logo).not.toBeInTheDocument();
    });
  });
});
