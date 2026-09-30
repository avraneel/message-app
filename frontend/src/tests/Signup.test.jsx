import { expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Signup from "../components/Signup";

describe("Signup Component", () => {
  test("displays the correct title", () => {
    render(<Signup />);
    expect(screen.getByRole("heading")).toHaveAccessibleName("Sign Up");
  });

  test("displays the username input field", () => {
    render(<Signup />);
    const username = screen.getByLabelText("Username *");
    expect(username).toBeVisible();
    expect(username).toBeRequired();
    expect(username).toHaveAttribute("name", "username");
  });

  test("displays the password input field", () => {
    render(<Signup />);
    const passwd = screen.getByLabelText("Password *");
    expect(passwd).toBeVisible();
    expect(passwd).toBeRequired();
    expect(passwd).toHaveAttribute("type", "password");
    expect(passwd).toHaveAttribute("name", "password");
  });

  test("displays the confirm password input field", () => {
    render(<Signup />);
    const confirmPasswd = screen.getByLabelText("Confirm Password *");
    expect(confirmPasswd).toBeVisible();
    expect(confirmPasswd).toBeRequired();
    expect(confirmPasswd).toHaveAttribute("type", "password");
    expect(confirmPasswd).toHaveAttribute("name", "confirm-password");
  });

  test("displays the Signup button and no other button", () => {
    render(<Signup />);
    expect(screen.getByRole("button")).toHaveAccessibleName("Sign Up");
    expect(screen.getAllByRole("button")).toHaveLength(1);
  });

  test("display only 3 input fields", () => {
    render(<Signup />);
    const inputs = document.querySelectorAll("input");
    expect(inputs).toHaveLength(3);
  });
});
