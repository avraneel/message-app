import { describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Settings from "../components/Settings";
import { MemoryRouter } from "react-router";

function renderSettings() {
  return render(
    <MemoryRouter>
      <Settings />
    </MemoryRouter>,
  );
}

describe("settings component", () => {
  test("renders all three items", () => {
    renderSettings();
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
