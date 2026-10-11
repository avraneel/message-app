import { expect } from "vitest";
import { render, screen } from "@testing-library/react";
import DeleteAccount from "../components/DeleteAccount";
import { MemoryRouter } from "react-router";

const username = "mockuser";

function renderDeleteAccount() {
  return render(
    <MemoryRouter>
      <DeleteAccount username={username} />
    </MemoryRouter>,
  );
}

describe("Login Component", () => {
  test("displays the correct title", () => {
    renderDeleteAccount();
    expect(
      screen.getByRole("heading", { name: /delete account/i }),
    ).toBeInTheDocument();
  });

  test("displays the username", () => {
    renderDeleteAccount();
    expect(screen.getByText(username)).toBeInTheDocument();
  });

  test("displays the Submit button and Back Link", () => {
    renderDeleteAccount();
    expect(
      screen.getByRole("link", { name: /no, go back/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /yes, delete my account/i }),
    ).toBeInTheDocument();
  });
});
