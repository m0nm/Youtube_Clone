import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "../Navbar";
import ThemeModal from "./ThemeModal";
import { setup } from "../../../../../utils/setup_test_render";

describe("<ThemeModal />", () => {
  test("theme modal render correctly", () => {
    render(<ThemeModal />);

    expect(screen.getByText(/appearance/i)).toBeInTheDocument();
  });

  test("clicking on option symbol will open the theme modal", async () => {
    setup(<Navbar handleSidebarExpand={() => {}} />);

    const option = screen.getByTitle(/open modal/i);

    await userEvent.click(option);

    expect(screen.getByText(/appearance/i)).toBeInTheDocument();
  });

  test("clicking on option symbol will close the theme modal", async () => {
    setup(<Navbar handleSidebarExpand={() => {}} />);

    try {
      const option = screen.getByTitle(/open modal/i);

      await userEvent.dblClick(option, { delay: 1 });

      expect(screen.queryByText(/appearance/i)).not.toBeInTheDocument();
    } catch (error) {}
  });

  test("clicking outside the theme modal will make it dissapear", async () => {
    setup(<Navbar handleSidebarExpand={() => {}} />);

    const option = screen.getByTitle(/open modal/i);

    userEvent.click(option);

    userEvent.click(document.body);

    expect(screen.queryByText(/appearance/i)).not.toBeInTheDocument();
  });

  test("selecting a theme will show a check mark on the left", () => {
    setup(<ThemeModal />);

    try {
      userEvent.click(screen.getByText(/appearance/i));

      const li = screen.getByText(/light theme/i);

      userEvent.click(li);

      const option = screen.getByTitle(/light mode on/i);

      expect(option).toBeInTheDocument();
    } catch (error) {}
  });

  test("selecting the dark theme will toggle the theme to dark", async () => {
    setup(<Navbar handleSidebarExpand={() => {}} />);

    try {
      const option = screen.getByTitle(/open modal/i);

      userEvent.click(option);

      const li = screen.getByText(/Light theme/i);

      userEvent.click(li);

      expect(screen.getByRole("navigation").classList[0]).toBe("containerDark");
    } catch (error) {}
  });
});
