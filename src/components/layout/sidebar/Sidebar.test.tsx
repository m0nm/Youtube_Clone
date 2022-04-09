import React from "react";
import { screen } from "@testing-library/react";
import { Context as ResponsiveContext } from "react-responsive";
import Sidebar from "./Sidebar";
import { setup } from "../../../../utils/setup_test_render";

describe("<Sidebar />", () => {
  test("Sidebar renders correctly", () => {
    setup(<Sidebar expand={true} />);

    // home
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    // subscriptions
    expect(screen.getByText(/subscriptions/i)).toBeInTheDocument();
    // football
    expect(screen.getByText(/football/i)).toBeInTheDocument();
    // cats
    expect(screen.getByText(/cats/i)).toBeInTheDocument();
    // dogs
    expect(screen.getByText(/dogs/i)).toBeInTheDocument();
  });

  test("sidebar width change on mobile", async () => {
    setup(
      <ResponsiveContext.Provider value={{ width: "700" }}>
        <Sidebar expand={true} />
      </ResponsiveContext.Provider>
    );

    expect(screen.getByRole("complementary")).toHaveStyle("width: 10rem");
  });
});
