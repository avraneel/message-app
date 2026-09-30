import { expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "../components/Home";

describe("Home Component", () => {
  test("displays the correct title", () => {
    render(<Home />);
    expect(screen.getByRole("heading")).toHaveAccessibleName("Message App");
  });

  test("displays only Sign up and Login buttons (in that order) and no other button", () => {
    render(<Home />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(2);
    expect(buttons[0]).toHaveAccessibleName("Sign Up");
    expect(buttons[1]).toHaveAccessibleName("Login");
  });
});
