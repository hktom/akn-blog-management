import { CommentInterface, ICommentResponse } from "./interface";

class Commentary implements CommentInterface {
  constructor(private axios: any, private url: string) {}

  async getComments(postId: number): Promise<ICommentResponse> {
    const resp: ICommentResponse = await this.axios.get(
      `${this.url}/comments?postId=${postId}`
    );
    return resp;
  }
}

export default Commentary;
