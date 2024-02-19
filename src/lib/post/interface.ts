export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface IPostResponse {
  status: number;
  data: IPost | IPost[] | null;
  error: any;
}

export interface PostInterface {
  getPost(): Promise<IPostResponse>;
  showPost(id: number): Promise<IPostResponse>;
  addPost(post: IPost): Promise<IPostResponse>;
}
