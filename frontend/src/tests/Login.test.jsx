import { expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Login from "../components/Login";
import { MemoryRouter } from "react-router";

function renderLogin() {
  return render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>,
  );
}

describe("Login Component", () => {
  test("displays the correct title", () => {
    renderLogin();
    expect(screen.getByRole("heading")).toHaveAccessibleName("Log In");
  });

  test("displays the username input field", () => {
    renderLogin();
    const username = screen.getByLabelText("Username *");
    expect(username).toBeVisible();
    expect(username).toBeRequired();
    expect(username).toHaveAttribute("name", "username");
  });

  test("displays the password input field", () => {
    renderLogin();
    const passwd = screen.getByLabelText("Password *");
    expect(passwd).toBeVisible();
    expect(passwd).toBeRequired();
    expect(passwd).toHaveAttribute("type", "password");
    expect(passwd).toHaveAttribute("name", "password");
  });

  test("displays the Login button and Back Link", () => {
    renderLogin();
    expect(screen.getByRole("link", { name: /back/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
  });

  test("display only 2 input fields", () => {
    renderLogin();
    const inputs = document.querySelectorAll("input");
    expect(inputs).toHaveLength(2);
  });
});
