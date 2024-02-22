import Http from "../http/http";
import { PostInterface, IPost, IPostResponse } from "./interface";

export default class Post implements PostInterface {
  public posts: IPost[] = [];
  constructor(private axios: Http, private url: string) {}

  async getPost(): Promise<IPostResponse> {
    const resp: IPostResponse = await this.axios.get(`${this.url}/posts`);
    return resp;
  }

  async showPost(id: number): Promise<IPostResponse> {
    const resp: IPostResponse = await this.axios.get(`${this.url}/posts/${id}`);
    return resp;
  }

  async addPost(post: IPost): Promise<IPostResponse> {
    const resp: IPostResponse = await this.axios.post(`${this.url}/posts`, post);
    return resp;
  }
}
