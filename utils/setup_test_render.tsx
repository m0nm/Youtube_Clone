import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";

// local storage mock
let localStorageMock: { [key: string]: string } = {};

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

// theme provider setups
beforeAll(() => {
  // Create mocks of localStorage getItem and setItem functions
  global.Storage.prototype.getItem = jest.fn(
    (key: string) => localStorageMock[key]
  );
  global.Storage.prototype.setItem = jest.fn((key: string, value: string) => {
    localStorageMock[key] = value;
  });
});

beforeEach(() => {
  // Reset global side-effects

  document.documentElement.style.colorScheme = "";
  document.documentElement.removeAttribute("data-theme");
  document.documentElement.removeAttribute("class");

  // Clear the localStorage-mock
  localStorageMock = {};
});

// < ------- * ------- >

// setting component and userEvent with providers
export const setup = (
  component: JSX.Element,
  hasSession: boolean = true,
  theme: "light" | "dark" = "light"
) => {
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
          <ThemeProvider defaultTheme={theme}>{children}</ThemeProvider>
        </SessionProvider>
      );
    },
  });
};
