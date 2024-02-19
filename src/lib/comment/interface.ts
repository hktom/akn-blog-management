export interface IComment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface ICommentResponse {
  status: number;
  data: IComment | IComment[] | null;
  error: any;
}

export interface CommentInterface {
  getComments(postId: number): Promise<ICommentResponse>;
}
