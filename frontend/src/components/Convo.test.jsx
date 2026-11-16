import { beforeEach, describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Convo from "./Convo";
import { MemoryRouter } from "react-router";
import { AuthProvider } from "./AuthContext";

beforeEach(() => {
  render(
    <MemoryRouter>
      <AuthProvider>
        <Convo name="abcd" />
      </AuthProvider>
    </MemoryRouter>,
  );
});

describe("Convo Component", () => {
  test("displays the person's name", () => {
    expect(screen.getByText("abcd")).toBeInTheDocument();
  });

  test("displays the button", () => {
    expect(screen.getByRole("link", { name: /go/i })).toBeInTheDocument();
  });
});
