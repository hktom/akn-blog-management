import Cookie from "@/lib/cookie/cookies";
import Cookies from "js-cookie";

beforeAll(() => {
  jest.mock("js-cookie");
  Cookies.set = jest.fn((name: string, value: string): string => {
    localStorage.setItem(name, value);
    return "";
  });

  Cookies.remove = jest.fn((name: string): void => {
    localStorage.removeItem(name);
  });

  Cookies.get = jest.fn((name?: string): any => {
    if (name) {
      return localStorage.getItem(name) || undefined;
    } else {
      return { mockedKey: "mockedValue" };
    }
  });
});

afterAll(() => {
  const cookie = new Cookie(Cookies, "sessionId");
  return cookie.remove();
});

describe("Cookies test", () => {
  it("should create a cookie", async () => {
    const cookie = new Cookie(Cookies, "sessionId");
    expect(cookie.create("token")).toBeTruthy();
  });

  it("should remove a cookie", async () => {
    const cookie = new Cookie(Cookies, "sessionId");
    await cookie.create("token");
    expect(await cookie.remove()).toBeTruthy();
  });

  it("should get a cookie", async () => {
    const cookie = new Cookie(Cookies, "sessionId");
    await cookie.create("token");
    expect(await cookie.getCookie()).toBe("token");
  });
});
