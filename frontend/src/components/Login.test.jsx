import { beforeEach, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Login from "./Login";
import { MemoryRouter } from "react-router";
import { AuthProvider } from "./AuthContext";

beforeEach(() => {
  render(
    <MemoryRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </MemoryRouter>,
  );
});

describe("Login Component", () => {
  test("displays the correct title", () => {
    expect(screen.getByRole("heading")).toHaveAccessibleName("Log In");
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

  test("displays the Login button and Back Link", () => {
    expect(screen.getByRole("link", { name: /back/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
  });

  test("display only 2 input fields", () => {
    const inputs = document.querySelectorAll("input");
    expect(inputs).toHaveLength(2);
  });
});
