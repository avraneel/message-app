import { afterEach, beforeEach, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Login from "../components/Login";
import { MemoryRouter } from "react-router";
import { AuthProvider } from "../components/AuthContext";
import userEvent from "@testing-library/user-event";

const mockFetch = vi.fn().mockResolvedValueOnce({
  ok: true,
  status: 200,
  json: {
    username: "Alice",
    passwd: "hash",
  },
});

global.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockClear();
  render(
    <MemoryRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </MemoryRouter>,
  );
});

afterEach(() => {
  vi.clearAllMocks();
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

  test("fetch is called once", async () => {
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /log in/i }));
  });
});
