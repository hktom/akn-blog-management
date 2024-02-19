import { IUser, IUserResponse, UserInterface } from "./interface";

class User implements UserInterface {
  constructor(private axios: any, private url: string) {}

  async getUserById(userId: number): Promise<IUserResponse> {
    const resp = await this.axios.get(`${this.url}/users/${userId}`);
    return resp;
  }

  private async getUsers(): Promise<IUserResponse> {
    const resp = await this.axios.get(`${this.url}/users`);
    return resp;
  }

  private findUserByEmail(data: IUser[], userEmail: string): IUser | null {
    const users = data as IUser[];
    const user = users.find((user: any) => user.email === userEmail);
    return user || null;
  }

  async getUserByEmail(userEmail: string): Promise<IUserResponse> {
    const { data, error, status } = await this.getUsers();
    if (error) {
      return { data: null, error, status };
    }
    const users = data as IUser[];
    const user = this.findUserByEmail(users, userEmail);
    return { data: user, error: null, status: 200 };
  }
}

export default User;