import { describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Settings from "../components/Settings";

describe("settings component", () => {
  test("renders all three items", () => {
    render(<Settings />);
    expect(
      screen.getByRole("button", { name: /change username */i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /change password */i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /delete account */i }),
    ).toBeInTheDocument();
  });
});
