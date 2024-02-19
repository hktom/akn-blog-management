import axios from "axios";
import { fakePost } from "./fakePost";
import Post from "../../src/lib/post/post";

beforeAll(async () => {
  return jest.mock("axios");
});

describe("Post related tests", () => {
  const resp = { data: fakePost, status: 200, error: null };
  axios.get = jest.fn().mockResolvedValue(resp);

  test("Get post", async () => {
    const post = new Post(axios, process.env.NEXT_PUBLIC_API_URL as string);
    const { data, error, status } = await post.getPost();
    expect(status).toBe(200);
    expect(error).toBeNull();
    expect(data).toEqual(fakePost);
  });
});
