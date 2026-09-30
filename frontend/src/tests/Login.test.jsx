import { expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Login from "../components/Login";

describe("Login Component", () => {
  test("displays the correct title", () => {
    render(<Login />);
    expect(screen.getByRole("heading")).toHaveAccessibleName("Log In");
  });

  test("displays the username input field", () => {
    render(<Login />);
    const username = screen.getByLabelText("Username *");
    expect(username).toBeVisible();
    expect(username).toBeRequired();
    expect(username).toHaveAttribute("name", "username");
  });

  test("displays the password input field", () => {
    render(<Login />);
    const passwd = screen.getByLabelText("Password *");
    expect(passwd).toBeVisible();
    expect(passwd).toBeRequired();
    expect(passwd).toHaveAttribute("type", "password");
    expect(passwd).toHaveAttribute("name", "password");
  });

  test("displays the Login button and no other button", () => {
    render(<Login />);
    expect(screen.getByRole("button")).toHaveAccessibleName("Log In");
    expect(screen.getAllByRole("button")).toHaveLength(1);
  });

  test("display only 2 input fields", () => {
    render(<Login />);
    const inputs = document.querySelectorAll("input");
    expect(inputs).toHaveLength(2);
  });
});
