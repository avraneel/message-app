import { describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Inbox from "../components/Inbox";
import { MemoryRouter } from "react-router";

const contacts = ["Aaron", "Beatrice", "Candance", "David"];

function renderInbox() {
  return render(
    <MemoryRouter>
      <Inbox contacts={contacts} />
    </MemoryRouter>,
  );
}

describe("Inbox Component", () => {
  test("renders all contacts", () => {
    renderInbox();
    contacts.forEach((el) => {
      expect(screen.getByText(el)).toBeVisible();
    });
  });
});
