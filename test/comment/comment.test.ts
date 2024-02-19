import axios from "axios";
import { fakeComment } from "./fakeComment";
import Commentary from "../../src/lib/comment/comment";

beforeAll(async () => {
  return jest.mock("axios");
});

describe("Post related tests", () => {
  test("Get comments", async () => {
    const resp = { data: fakeComment, status: 200, error: null };
    axios.get = jest.fn().mockResolvedValue(resp);

    const comment = new Commentary(
      axios,
      process.env.NEXT_PUBLIC_API_URL as string
    );
    const postId = 1;
    const { data, error, status } = await comment.getComments(postId);

    expect(status).toBe(200);
    expect(error).toBeNull();
    expect(data).toEqual(fakeComment);
  });
});
