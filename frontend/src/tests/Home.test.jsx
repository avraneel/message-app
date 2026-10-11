import { expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "../components/Home";
import { MemoryRouter } from "react-router";

function renderHome() {
  return render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );
}

describe("Home Component", () => {
  test("displays the correct title", () => {
    renderHome();
    expect(
      screen.getByRole("heading", { name: /message app/i }),
    ).toBeInTheDocument();
  });

  test("display sign up and login links", () => {
    renderHome();
    expect(screen.getByRole("link", { name: /sign up/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /login/i })).toBeInTheDocument();
  });
});
