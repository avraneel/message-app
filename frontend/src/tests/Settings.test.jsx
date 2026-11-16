import { beforeEach, describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Settings from "../components/Settings";
import { MemoryRouter } from "react-router";
import { AuthProvider } from "../components/AuthContext";

beforeEach(() => {
  render(
    <MemoryRouter>
      <AuthProvider>
        <Settings />
      </AuthProvider>
    </MemoryRouter>,
  );
});

describe("Settings component", () => {
  test("renders all three items", () => {
    expect(
      screen.getByRole("link", { name: /change username/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /change password/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /delete account/i }),
    ).toBeInTheDocument();
  });
});
