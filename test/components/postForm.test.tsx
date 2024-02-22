import PostForm from "@/component/postForm";
import AppProvider from "@/config/appProvider";
import { act, fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
import { fakePost } from "../unit/post/fakePost";

jest.mock("next/navigation", () => require("next-router-mock"));
jest.mock("axios");

describe("post form test", () => {
  it("should render the form", () => {
    render(<PostForm />);
    expect(screen.getByText("New Post")).toBeInTheDocument();
    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Body")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  it("should add new post", async () => {
    axios.post = jest.fn().mockResolvedValue(fakePost[0]);
    render(
      <AppProvider>
        <PostForm />
      </AppProvider>
    );

    const title = screen.getByLabelText("Title");
    const body = screen.getByLabelText("Body");

    fireEvent.change(title, { target: { value: "Nowhere to Turn" } });
    fireEvent.change(body, {
      target: {
        value:
          "A Nepali immigrant tries to survive, and support a family back home, on a cab driver’s wages in Qatar.",
      },
    });

    await act(async () => {
      await fireEvent.click(screen.getByText("Save"));
    });

    expect(screen.queryByTestId("error-div")).toBeNull();
  });
});
