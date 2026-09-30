import { describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Inbox from "../components/Inbox";

describe("Inbox Component", () => {
  test("renders all contacts", () => {
    const contacts = ["Aaron", "Beatrice", "Candance", "David"];
    render(<Inbox contacts={contacts} />);
    contacts.forEach((el) => {
      expect(screen.getByText(el)).toBeVisible();
    });
  });
});
