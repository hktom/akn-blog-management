import AppProvider from "@/config/appProvider";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { fakePost } from "../unit/post/fakePost";
import PostList from "@/component/postList";

jest.mock("next/navigation", () => require("next-router-mock"));
jest.mock("axios");

describe("post list test", () => {
  it("should rend a list of 100 posts", () => {
    render(
      <AppProvider>
        <PostList data={fakePost} />
      </AppProvider>
    );

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getAllByRole("post-item").length).toBe(100);
  });
});
