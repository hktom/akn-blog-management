import axios from "axios";

export interface IAxios {
  status: number;
  data: any;
  error: any;
}

export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostInterface {
  getPost(): void;
  showPost(id: number): IPost;
  addPost(post: string): void;
}

export default class Post implements PostInterface {
  public posts: IPost[] = [];
  constructor(private axios: any, private url: string) {}

  async getPost() {
    const resp: IAxios = await this.axios.get(`${this.url}/posts`);
    return resp;
  }

  showPost(id: number): IPost {
    return {
      userId: 1,
      id: 1,
      title: "title",
      body: "body",
    };
  }

  addPost(post: string): IPost {
    return {
      userId: 1,
      id: 1,
      title: "title",
      body: "body",
    };
  }
}
