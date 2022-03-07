import React from "react";
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "./Navbar";
import Modal from "./modal/Modal";

const setup = (component: JSX.Element) => {
  userEvent.setup();
  render(component);
};

describe("<Navbar />", () => {
  test("Navbar renders without crashing", () => {
    render(<Navbar />);
  });

  test("navbar input initialized empty", () => {
    render(<Navbar />);
    const searchInput = screen.getByRole("textbox");

    expect(searchInput).toHaveValue("");
  });

  test("clicking on option symbol will open the theme modal", async () => {
    setup(<Navbar />);

    const modalContainer = screen.getByTestId("modal-container");

    await userEvent.click(modalContainer.firstChild as Element);

    await waitFor(() => {
      expect(screen.getByText(/appearance/i)).toBeInTheDocument();
    });
  });

  test("clicking on option symbol will close the theme modal", async () => {
    setup(<Navbar />);

    const modalContainer = screen.getByTestId("modal-container");

    await userEvent.dblClick(modalContainer.firstChild as Element);

    await waitFor(() => {
      expect(screen.queryByText(/appearance/i)).not.toBeInTheDocument();
    });
  });

  test("clicking outside the theme modal will make it dissapear", async () => {
    setup(<Navbar />);

    const modalContainer = screen.getByTestId("modal-container");

    await userEvent.click(modalContainer.firstChild as Element);

    await userEvent.click(document.body);

    await waitFor(() => {
      expect(screen.queryByText(/appearance/i)).not.toBeInTheDocument();
    });
  });

  test("selecting a theme will show a check mark on the left", async () => {
    setup(<Modal setModal={() => {}} styles={""} />);

    await userEvent.click(screen.getByText(/appearance/i));

    const li = await screen.getByText(/light/i);

    await userEvent.click(li);

    const svg = li.querySelector("svg");

    await waitFor(() => expect(svg).toBeInTheDocument());
  });
});
