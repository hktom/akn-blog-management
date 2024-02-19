import {
  RequestCookie,
  ResponseCookies,
} from "next/dist/compiled/@edge-runtime/cookies";
import Cookie from "../src/lib/cookie/cookies";
import { cookies } from "next/headers";

beforeAll(() => {
  jest.mock("cookies");
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

afterAll(() => {
  const cookie = new Cookie(cookies, "sessionId");
  return cookie.remove();
});

describe("Cookies test", () => {
  it("should create a cookie", () => {
    const cookie = new Cookie(cookies, "sessionId");
    expect(cookie.create("token")).toBeTruthy();
  });

  it("should remove a cookie", () => {
    const cookie = new Cookie(cookies, "sessionId");
    cookie.create("token");
    expect(cookie.remove()).toBeTruthy();
  });

  it("should get a cookie", () => {
    const cookie = new Cookie(cookies, "sessionId");
    cookie.create("token");
    expect(cookie.getCookie()).toBe("token");
  });
});
