import { describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Logo from "../components/Logo";

describe("Logo Component", () => {
  test("renders the correct alt text", () => {
    render(<Logo />);
    expect(screen.getByRole("img").alt).toBe("main-logo");
  });
});
