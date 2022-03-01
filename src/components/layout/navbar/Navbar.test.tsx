import React from "react";
import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";

test("Navbar renders without crashing", () => {
  render(<Navbar />);
});

test("navbar input initialized empty", () => {
  render(<Navbar />);
  const searchInput = screen.getByRole("textbox");

  expect(searchInput).toHaveValue("");
});
