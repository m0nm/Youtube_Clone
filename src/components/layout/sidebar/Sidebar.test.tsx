import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Context as ResponsiveContext } from "react-responsive";
import Sidebar from "./Sidebar";
import { setup } from "../../../../utils/setup_test_render";

describe("<Sidebar />", () => {
  test("Sidebar renders correctly", () => {
    setup(<Sidebar expand={true} />);
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
