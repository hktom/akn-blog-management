import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import ResponsiveAppBar from "../src/component/appBar";

jest.mock("next/navigation", () => require("next-router-mock"));

describe("AppBar Test", () => {
  it("should render the AppBar", () => {
    render(<ResponsiveAppBar />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("New")).toBeInTheDocument();
  });
});
