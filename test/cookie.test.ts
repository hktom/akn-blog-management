import Cookie from "../src/lib/cookie/cookies";
import { cookies } from "next/headers";

afterAll(() => {
  const cookie = new Cookie(cookies, "sessionId");
  cookie.remove();
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
