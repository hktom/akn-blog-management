import { cookies } from "next/headers";
import { CookieInterface } from "./interface";

class Cookie implements CookieInterface {
  private maxAge = 60 * 60 * 24 * 7; // One week
  private httpOnly = true;
  private secure = process.env.NODE_ENV === "production";
  private path = "/";

  constructor(private cookie: typeof cookies, private cookieName: string) {}

  async create(token: string): Promise<boolean> {
    await this.cookie().set(this.cookieName, token, {
      httpOnly: this.httpOnly,
      secure: this.secure,
      maxAge: this.maxAge,
      path: this.path,
    });

    return true;
  }

  async remove(): Promise<boolean> {
    await this.cookie().delete(this.cookieName);

    return true;
  }
}

export default Cookie;
