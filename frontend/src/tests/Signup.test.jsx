import { beforeEach, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Signup from "../components/Signup";
import { MemoryRouter } from "react-router";
import { AuthProvider } from "../components/AuthContext";

beforeEach(() => {
  render(
    <MemoryRouter>
      <AuthProvider>
        <Signup />
      </AuthProvider>
    </MemoryRouter>,
  );
});

describe("Signup Component", () => {
  test("displays the correct title", () => {
    expect(screen.getByRole("heading")).toHaveAccessibleName("Sign Up");
  });

  test("displays the username input field", () => {
    const username = screen.getByLabelText("Username *");
    expect(username).toBeVisible();
    expect(username).toBeRequired();
    expect(username).toHaveAttribute("name", "username");
  });

  test("displays the password input field", () => {
    const passwd = screen.getByLabelText("Password *");
    expect(passwd).toBeVisible();
    expect(passwd).toBeRequired();
    expect(passwd).toHaveAttribute("type", "password");
    expect(passwd).toHaveAttribute("name", "password");
  });

  test("displays the confirm password input field", () => {
    const confirmPasswd = screen.getByLabelText("Confirm Password *");
    expect(confirmPasswd).toBeVisible();
    expect(confirmPasswd).toBeRequired();
    expect(confirmPasswd).toHaveAttribute("type", "password");
    expect(confirmPasswd).toHaveAttribute("name", "confirm-password");
  });

  test("displays the Signup button and Back link", () => {
    expect(screen.getByRole("link", { name: /back/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign up/i }),
    ).toBeInTheDocument();
  });
});
