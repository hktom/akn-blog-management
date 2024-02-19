export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface IAxios {
  status: number;
  data: IPost | IPost[] | null;
  error: any;
}

export interface PostInterface {
  getPost(): Promise<IAxios>;
  showPost(id: number): Promise<IAxios>;
  addPost(post: IPost): Promise<IAxios>;
}
