import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';
import FormLogin from ".";

describe("FormLogin Test", () => {
  render(<FormLogin />);
  expect(screen.getByRole("button")).toHaveTextContent("Login");
});
