import { expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ChangePassword from "../components/ChangePassword";
import { MemoryRouter } from "react-router";

function renderChangePasword() {
  return render(
    <MemoryRouter>
      <ChangePassword />
    </MemoryRouter>,
  );
}

describe("Login Component", () => {
  test("displays the correct title", () => {
    renderChangePasword();
    expect(
      screen.getByRole("heading", { name: /change password/i }),
    ).toBeInTheDocument();
  });

  test("displays the old password input field", () => {
    renderChangePasword();
    const oldPassword = screen.getByLabelText("Old Password *");
    expect(oldPassword).toBeVisible();
    expect(oldPassword).toBeRequired();
    expect(oldPassword).toHaveAttribute("name", "old-password");
    expect(oldPassword).toHaveAttribute("type", "password");
  });

  test("displays the new password input field", () => {
    renderChangePasword();
    const newUsername = screen.getByLabelText("New Password *");
    expect(newUsername).toBeVisible();
    expect(newUsername).toBeRequired();
    expect(newUsername).toHaveAttribute("name", "new-password");
    expect(newUsername).toHaveAttribute("type", "password");
  });

  test("displays the confirm password input field", () => {
    renderChangePasword();
    const newUsername = screen.getByLabelText("Confirm Password *");
    expect(newUsername).toBeVisible();
    expect(newUsername).toBeRequired();
    expect(newUsername).toHaveAttribute("name", "confirm-password");
    expect(newUsername).toHaveAttribute("type", "password");
  });

  test("displays the Submit button and Back Link", () => {
    renderChangePasword();
    expect(screen.getByRole("link", { name: /back/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /change password/i }),
    ).toBeInTheDocument();
  });

  test("display only 3 input fields", () => {
    renderChangePasword();
    const inputs = document.querySelectorAll("input");
    expect(inputs).toHaveLength(3);
  });
});
