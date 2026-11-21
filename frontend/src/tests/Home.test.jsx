import { beforeEach, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "../components/Home";
import { MemoryRouter } from "react-router";
import { AuthProvider } from "../components/AuthContext";

beforeEach(() => {
  render(
    <MemoryRouter>
      <AuthProvider>
        <Home />
      </AuthProvider>
    </MemoryRouter>,
  );
});

describe("Home Component", () => {
  test("displays the correct title", () => {
    expect(
      screen.getByRole("heading", { name: /message app/i }),
    ).toBeInTheDocument();
  });

  test("display sign up and login links", () => {
    expect(screen.getByRole("link", { name: /sign up/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /login/i })).toBeInTheDocument();
  });
});
