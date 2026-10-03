import { describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Convo from "../components/Convo";

describe("Convo Component", () => {
  test("displays the person's name", () => {
    render(<Convo name="abcd" />);
    expect(screen.getByText("abcd")).toBeInTheDocument();
  });

  test("displays the button", () => {
    render(<Convo name="abcd" />);
    expect(screen.getByRole("button", { name: /go/i })).toBeInTheDocument();
  });
});
