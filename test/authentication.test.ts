import {
  RequestCookie,
  ResponseCookies,
} from "next/dist/compiled/@edge-runtime/cookies";
import Cookie from "../src/lib/cookie/cookies";
import { cookies } from "next/headers";
import Authentication from "../src/lib/authentication/authentication";
import User from "../src/lib/user/user";
import { fakeUser } from "./user/fakeUser";
import axios from "axios";

beforeAll(() => {
  jest.mock("cookies");
  jest.mock("axios");

  const resp = { data: fakeUser[0], status: 200, error: null };
  axios.get = jest.fn().mockResolvedValue(resp);

  cookies().set = jest.fn((name: string, value: string): ResponseCookies => {
    localStorage.setItem(name, value);
    return {} as ResponseCookies;
  });

  cookies().delete = jest.fn((name: string): ResponseCookies => {
    localStorage.removeItem(name);
    return {} as ResponseCookies;
  });

  cookies().get = jest.fn((name: string): RequestCookie => {
    return { value: localStorage.getItem(name) } as RequestCookie;
  });
});

describe("Authentication tests", () => {
  it("should login a user", async () => {
    const user = new User(axios, process.env.NEXT_PUBLIC_API_URL as string);
    const cookie = new Cookie(cookies, "sessionId");

    const authentication = new Authentication(
      user,
      process.env.NEXT_PUBLIC_DEFAULT_USER_PASSWORD || "",
      process.env.NEXT_PUBLIC_TOKEN || "",
      cookie
    );

    const resp = await authentication.login(
      "Sincere@april.biz",
      process.env.NEXT_PUBLIC_DEFAULT_USER_PASSWORD || ""
    );

    expect(resp.message).toBe("User logged in");
  });

  it("should logout a user", async () => {
    const user = new User(axios, process.env.NEXT_PUBLIC_API_URL as string);
    const cookie = new Cookie(cookies, "sessionId");

    const authentication = new Authentication(
      user,
      process.env.NEXT_PUBLIC_DEFAULT_USER_PASSWORD || "",
      process.env.NEXT_PUBLIC_TOKEN || "",
      cookie
    );

    const resp = await authentication.logout();

    expect(resp.message).toBe("User logged out");
  });

  it("should check a user session", async () => {
    const user = new User(axios, process.env.NEXT_PUBLIC_API_URL as string);
    const cookie = new Cookie(cookies, "sessionId");

    const authentication = new Authentication(
      user,
      process.env.NEXT_PUBLIC_DEFAULT_USER_PASSWORD || "",
      process.env.NEXT_PUBLIC_TOKEN || "",
      cookie
    );

    const resp = await authentication.login(
      "Sincere@april.biz",
      process.env.NEXT_PUBLIC_DEFAULT_USER_PASSWORD || ""
    );

    const { sessionId } = await authentication.checkSession();

    expect(resp.message).toBe("User logged in");
    expect(sessionId).toBeDefined();
  });
});
