import { beforeEach, describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Inbox from "../components/Inbox";
import { MemoryRouter } from "react-router";
import { AuthProvider } from "../components/AuthContext";

beforeEach(() => {
  render(
    <MemoryRouter>
      <AuthProvider>
        <Inbox />
      </AuthProvider>
    </MemoryRouter>,
  );
});

describe("Inbox Component", () => {
  test("renders all contacts", () => {
    contacts.forEach((el) => {
      expect(screen.getByText(el)).toBeVisible();
    });
  });
});
