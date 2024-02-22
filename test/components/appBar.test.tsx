import ResponsiveAppBar from "@/component/appBar";
import { render, screen } from "@testing-library/react";

jest.mock("next/navigation", () => require("next-router-mock"));

describe("AppBar Test", () => {
  it("should render the AppBar", () => {
    render(<ResponsiveAppBar />);

    expect(screen.getAllByAltText("Home")).toBeInTheDocument();
    expect(screen.getAllByAltText("New")).toBeInTheDocument();
  });
});
