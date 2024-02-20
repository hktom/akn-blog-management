import Cookie from "../cookie/cookies";
import { IUser } from "../user/interface";
import User from "../user/user";
import { AuthenticationInterface, IAuthResponse } from "./interface";

class Authentication implements AuthenticationInterface {
  constructor(
    private user: User,
    private password: string,
    private cookie: Cookie
  ) {}

  private checkEmail(email: string): boolean {
    return /@/.test(email);
  }

  private checkPassword(password: string): boolean {
    return password === this.password;
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

    const userId = (data as IUser).id;

    await this.cookie.create(userId.toString());
    return {
      userId: userId,
      message: "User logged in",
    };
  }

  async logout(): Promise<Partial<IAuthResponse>> {
    await this.cookie.remove();
    return {
      message: "User logged out",
    };
  }

  async checkSession(): Promise<Partial<IAuthResponse>> {
    const token = await this.cookie.getCookie();
    if (!token) {
      return {
        message: "No session",
        error: "No session",
      };
    }

    return {
      userId: parseInt(token),
      message: "User logged in",
    };
  }
}

export default Authentication;
