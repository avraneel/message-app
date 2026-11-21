import { describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Inbox from "./Inbox";
import { MemoryRouter } from "react-router";
import { AuthProvider } from "./AuthContext";

describe("Inbox Component", () => {
  test("shows the heading", () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Inbox />
        </AuthProvider>
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { name: /inbox/i })).toBeInTheDocument();
  });
});
