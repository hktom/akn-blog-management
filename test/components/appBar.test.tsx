import ResponsiveAppBar from "@/component/appBar";
import { render, screen } from "@testing-library/react";

jest.mock("next/navigation", () => require("next-router-mock"));

describe("AppBar Test", () => {
  it("should render the AppBar", () => {
    render(<ResponsiveAppBar />);

    expect(screen.getAllByText("Home")[0]).toBeInTheDocument();
    expect(screen.getAllByText("New")[0]).toBeInTheDocument();
  });
});
