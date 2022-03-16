import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
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
export const setup = (component: JSX.Element, hasSession: boolean = true) => {
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
