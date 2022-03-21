import React from "react";
import { render, screen } from "@testing-library/react";
import Categories from "./Categories";

describe("<Categories />", () => {
  test("Categories render correctly", () => {
    render(<Categories />);

    expect(screen.getByText("All")).toBeInTheDocument();
  });
});
