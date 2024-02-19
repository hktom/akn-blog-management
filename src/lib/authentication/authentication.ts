import { IUser } from "../user/interface";
import User from "../user/user";
import { AuthenticationInterface, IAuthResponse } from "./interface";

class Authentication implements AuthenticationInterface {
  constructor(private user: User) {}

  private checkEmail(email: string): boolean {
    return /@/.test(email);
  }

  private checkPassword(password: string): boolean {
    return password === process.env.NEXT_PUBLIC_DEFAULT_USER_PASSWORD;
  }

  async login(
    email: string,
    password: string
  ): Promise<Partial<IAuthResponse>> {
    if (!this.checkEmail(email)) {
      return {
        message: "Invalid email",
        error: "Invalid email",
      };
    }

    if (!this.checkPassword(password)) {
      return {
        message: "Invalid password",
        error: "Invalid password",
      };
    }

    const { data, error, status } = await this.user.getUserByEmail(email);
    if (!data || error || status !== 200) {
      return {
        message: "User not found",
        error: "User not found",
      };
    }

    return {
      sessionId: process.env.NEXT_PUBLIC_TOKEN,
      userId: (data as IUser).id,
      message: "User logged in",
    };
  }

  async logout(): Promise<Partial<IAuthResponse>> {
    return {
      message: "User logged out",
    };
  }
}

export default Authentication;
