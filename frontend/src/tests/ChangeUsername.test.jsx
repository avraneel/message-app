import { expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ChangeUsername from "../components/ChangeUsername";
import { MemoryRouter } from "react-router";

function renderChangeUsername() {
  return render(
    <MemoryRouter>
      <ChangeUsername />
    </MemoryRouter>,
  );
}

describe("Login Component", () => {
  test("displays the correct title", () => {
    renderChangeUsername();
    expect(
      screen.getByRole("heading", { name: /change username/i }),
    ).toBeInTheDocument();
  });

  test("displays the old username input field", () => {
    renderChangeUsername();
    const oldUsername = screen.getByLabelText("Old Username *");
    expect(oldUsername).toBeVisible();
    expect(oldUsername).toBeRequired();
    expect(oldUsername).toHaveAttribute("name", "old-username");
    expect(oldUsername).toHaveAttribute("type", "text");
  });

  test("displays the new username input field", () => {
    renderChangeUsername();
    const newUsername = screen.getByLabelText("New Username *");
    expect(newUsername).toBeVisible();
    expect(newUsername).toBeRequired();
    expect(newUsername).toHaveAttribute("name", "new-username");
    expect(newUsername).toHaveAttribute("type", "text");
  });

  test("displays the Submit button and Back Link", () => {
    renderChangeUsername();
    expect(screen.getByRole("link", { name: /back/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /change username/i }),
    ).toBeInTheDocument();
  });

  test("display only 2 input fields", () => {
    renderChangeUsername();
    const inputs = document.querySelectorAll("input");
    expect(inputs).toHaveLength(2);
  });
});
