import { render, screen } from "@testing-library/react";
import PostComment from "@/component/postComment";

describe("Component Comments test", () => {
  it("should not render the author", () => {
    render(
      <PostComment
        comments={[
          {
            id: 1,
            postId: 1,
            name: "Comment 1",
            email: "email",
            body: "Comment 1",
          },
        ]}
      />
    );
    expect(screen.getByText("Comments")).toBeInTheDocument();
  });
});
