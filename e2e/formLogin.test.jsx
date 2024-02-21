import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormLogin from "../src/component/FormLogin";
import mockRouter from 'next-router-mock';

jest.mock('next/navigation', () => require('next-router-mock'));

describe("FormLogin Test", () => {
  it("should test login button", () => {
    
    // mockRouter.push("/initial-path");
    render(<FormLogin />);
    expect(screen.getByRole("button")).toHaveTextContent("Login");
  });
});
