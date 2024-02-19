import { PostInterface, IPost, IAxios } from "./interface";

export default class Post implements PostInterface {
  public posts: IPost[] = [];
  constructor(private axios: any, private url: string) {}

  async getPost(): Promise<IAxios> {
    const resp: IAxios = await this.axios.get(`${this.url}/posts`);
    return resp;
  }

  async showPost(id: number): Promise<IAxios> {
    const resp: IAxios = await this.axios.get(`${this.url}/posts`);
    return resp;
  }

  async addPost(post: IPost): Promise<IAxios> {
    const resp: IAxios = this.axios.post(`${this.url}/posts`, post);
    return resp;
  }
}
