// import { cookies } from "next/headers";
import { CookieInterface } from "./interface";
import Cookies from "js-cookie";

class Cookie implements CookieInterface {
  private maxAge = 7;
  private path = "";

  constructor(private cookie: typeof Cookies, private cookieName: string) {}

  async create(token: string): Promise<boolean> {
    await this.cookie.set(this.cookieName, token, {
      expires: this.maxAge,
      path: this.path,
    });

    return true;
  }

  async remove(): Promise<boolean> {
    await this.cookie.remove(this.cookieName);

    return true;
  }

  async getCookie(): Promise<string | null> {
    const cookie = await this.cookie.get(this.cookieName);
    return cookie || null;
  }
}

export default Cookie;
