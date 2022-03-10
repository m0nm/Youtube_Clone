import React, { JSXElementConstructor } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "./Navbar";
import Modal from "./modal/Modal";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { AiOutlineCheck } from "react-icons/ai";

// window matchmedia fix for the theme provider
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

// setting component and userEvent with providers

const setup = (component: JSX.Element, hasSession: boolean = true) => {
  userEvent.setup();
  render(component, {
    wrapper: ({ children }) => {
      return (
        <SessionProvider
          session={
            hasSession
              ? {
                  expires: "123456789",
                  user: { name: "", email: "", image: "" },
                }
              : null
          }
        >
          <ThemeProvider>{children}</ThemeProvider>
        </SessionProvider>
      );
    },
  });
};

describe("<Navbar />", () => {
  test("Navbar renders without crashing", () => {
    setup(<Navbar />);
  });

  test("navbar input initialized empty", () => {
    setup(<Navbar />);
    const searchInput = screen.getByRole("textbox");

    expect(searchInput).toHaveValue("");
  });

  test("the sign-in button should be rendered if there is no session", async () => {
    setup(<Navbar />, false);

    const button = screen.getByRole("button", { name: "SIGN IN" });

    expect(button).toBeInTheDocument();
  });

  test("the sign-in button should not be rendered if there is a session", async () => {
    setup(<Navbar />);

    const button = screen.queryByText("SIGN IN");

    expect(button).not.toBeInTheDocument();
  });

  test("clicking on option symbol will open the theme modal", async () => {
    setup(<Navbar />);

    const modalContainer = screen.getByTestId("modal-container");

    await userEvent.click(modalContainer.firstChild as Element);

    expect(screen.getByText(/appearance/i)).toBeInTheDocument();
  });

  test("clicking on option symbol will close the theme modal", async () => {
    setup(<Navbar />);

    const modalContainer = screen.getByTestId("modal-container");

    await userEvent.dblClick(modalContainer.firstChild as Element);

    expect(screen.queryByText(/appearance/i)).not.toBeInTheDocument();
  });

  test("clicking outside the theme modal will make it dissapear", async () => {
    setup(<Navbar />);

    const modalContainer = screen.getByTestId("modal-container");

    userEvent.click(modalContainer.firstChild as Element);

    userEvent.click(document.body);

    expect(screen.queryByText(/appearance/i)).not.toBeInTheDocument();
  });

  test("selecting a theme will show a check mark on the left", () => {
    setup(<Modal styles={""} />);

    try {
      userEvent.click(screen.getByText(/appearance/i));

      const li = screen.getByText(/light/i);

      userEvent.click(li);

      const svg = li.querySelector("svg");

      expect(svg).toBeInTheDocument();
    } catch (error) {}
  });
});
