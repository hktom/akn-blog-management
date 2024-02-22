import Http from "../http/http";
import { CommentInterface, IComment, ICommentResponse } from "./interface";

class Commentary implements CommentInterface {
  constructor(private axios: Http, private url: string) {}

  static addComment(payload: IComment, comments: IComment[]): ICommentResponse {
    const data = [...comments];
    data.unshift(payload);
    
    return {
      status: 200,
      error: null,
      data,
    };
  }

  async getComments(postId: number): Promise<ICommentResponse> {
    const resp: ICommentResponse = await this.axios.get(
      `${this.url}/comments?postId=${postId}`
    );
    return resp;
  }
}

export default Commentary;
