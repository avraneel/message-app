import { expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "../components/Home";

describe("Home Component", () => {
  test("displays the correct title", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: /message app/i }),
    ).toBeInTheDocument();
  });

  test("display sign up and login button", () => {
    render(<Home />);
    expect(screen.getByRole("link", { name: /sign up/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /login/i })).toBeInTheDocument();
  });

  // test("displays only Sign up and Login buttons (in that order) and no other button", () => {
  //   render(<Home />);
  //   const buttons = screen.getAllByRole("link");
  //   expect(buttons.length).toBe(2);
  //   expect(buttons[0]).toHaveAccessibleName(/sign up/i);
  //   expect(buttons[1]).toHaveAccessibleName(/login/i);
  // });
});
