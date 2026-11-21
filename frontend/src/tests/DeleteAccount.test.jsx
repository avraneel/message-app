import { beforeEach, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import DeleteAccount from "./DeleteAccount";
import { MemoryRouter } from "react-router";
import { AuthProvider } from "./AuthContext";

beforeEach(() => {
  render(
    <MemoryRouter>
      <AuthProvider>
        <DeleteAccount />
      </AuthProvider>
    </MemoryRouter>,
  );
});

describe("DeleteAccount", () => {
  test("displays the correct title", () => {
    expect(
      screen.getByRole("heading", { name: /delete account/i }),
    ).toBeInTheDocument();
  });

  test("displays the Submit button and Back Link", () => {
    expect(
      screen.getByRole("link", { name: /no, go back/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /yes, delete my account/i }),
    ).toBeInTheDocument();
  });
});
