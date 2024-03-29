import axios from "axios";
import { fakePost } from "./fakePost";
import { IPost } from "@/lib/post/interface";
import Http from "@/lib/http/http";
import Post from "@/lib/post/post";

beforeAll(async () => {
  return jest.mock("axios");
});

describe("Post related tests", () => {
  test("Get posts", async () => {
    const resp = { data: fakePost, status: 200, error: null };
    axios.get = jest.fn().mockResolvedValue(resp);

    const post = new Post(new Http(axios), process.env.NEXT_PUBLIC_API_URL as string);
    const { data, error, status } = await post.getPost();
    expect(status).toBe(200);
    expect(error).toBeNull();
    expect(data).toEqual(fakePost);
  });

  test("Get post by Id", async () => {
    const resp = { data: fakePost.slice(0, 1), status: 200, error: null };
    axios.get = jest.fn().mockResolvedValue(resp);

    const post = new Post(new Http(axios), process.env.NEXT_PUBLIC_API_URL as string);
    const postId = 1;
    const { data, error, status } = await post.showPost(postId);

    expect(status).toBe(200);
    expect(error).toBeNull();
    expect(data).toEqual(fakePost.slice(0, 1));
  });

  test("Add post", async () => {
    const payload: IPost = {
      userId: 200,
      id: 200,
      title: "title",
      body: "body",
    };

    const resp = { data: [...fakePost, payload], status: 200, error: null };
    axios.post = jest.fn().mockResolvedValue(resp);

    const post = new Post(new Http(axios), process.env.NEXT_PUBLIC_API_URL as string);
    const { data, error, status } = await post.addPost(payload);

    expect(status).toBe(200);
    expect(error).toBeNull();
    expect((data as IPost[]).length).toEqual(fakePost.push(payload));
  });
});
