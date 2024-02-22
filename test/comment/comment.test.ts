import axios from "axios";
import { fakeComment } from "./fakeComment";
import Commentary from "../../src/lib/comment/comment";
import { IComment } from "../../src/lib/comment/interface";
import Http from "@/lib/http/http";

beforeAll(async () => {
  return jest.mock("axios");
});

describe("Comment tests", () => {
  test("Get comments", async () => {
    const resp = { data: fakeComment, status: 200, error: null };
    axios.get = jest.fn().mockResolvedValue(resp);

    const comment = new Commentary(
      new Http(axios),
      process.env.NEXT_PUBLIC_API_URL as string
    );
    const postId = 1;
    const { data, error, status } = await comment.getComments(postId);

    expect(status).toBe(200);
    expect(error).toBeNull();
    expect(data).toEqual(fakeComment);
  });

  test("add comment", () => {
    const payload: IComment = {
      id: 1,
      postId: 1,
      name: "John Doe",
      email: "",
      body: "This is a comment",
    };
    const { status, error, data } = Commentary.addComment(payload, fakeComment);

    expect(status).toBe(200);
    expect(error).toBeNull();
    expect(data).toEqual([payload, ...fakeComment]);
  });
});
