import Cookie from "../cookie/cookies";
import { IUser } from "../user/interface";
import User from "../user/user";
import { AuthenticationInterface, IAuthResponse } from "./interface";

class Authentication implements AuthenticationInterface {
  constructor(
    private user: User,
    private password: string,
    private token: string,
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

    await this.cookie.create(this.token);

    return {
      sessionId: this.token,
      userId: (data as IUser).id,
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
    const sessionId = await this.cookie.getCookie();
    if (!sessionId) {
      return {
        message: "No session",
        error: "No session",
      };
    }

    return {
      sessionId,
      message: "Session found",
    };
  }
}

export default Authentication;
