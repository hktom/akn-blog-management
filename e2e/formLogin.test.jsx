import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormLogin from "../src/component/FormLogin";
import mockRouter from "next-router-mock";

jest.mock("next/navigation", () => require("next-router-mock"));

describe("FormLogin Test", () => {
  it("should form have field email, password and a login button", () => {
    render(<FormLogin />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent("Login");
  });
});
