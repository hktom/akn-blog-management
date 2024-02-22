import Cookie from "../src/lib/cookie/cookies";
import Authentication from "../src/lib/authentication/authentication";
import User from "../src/lib/user/user";
import { fakeUser } from "./user/fakeUser";
import axios from "axios";
import Cookies from "js-cookie";
import Http from "@/lib/http/http";

beforeAll(() => {
  jest.mock("js-cookie");
  jest.mock("axios");

  const axiosResp = { data: fakeUser, status: 200, error: null };
  axios.get = jest.fn().mockResolvedValue(axiosResp);

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

const user = new User(new Http(axios), process.env.NEXT_PUBLIC_API_URL as string);
const cookie = new Cookie(Cookies, "sessionId");

const authentication = new Authentication(
  user,
  process.env.NEXT_PUBLIC_DEFAULT_USER_PASSWORD || "",
  cookie
);

describe("Authentication tests", () => {
  it("should login a user", async () => {
    const { message, userId } = await authentication.login(
      "Sincere@april.biz",
      process.env.NEXT_PUBLIC_DEFAULT_USER_PASSWORD || ""
    );

    expect(userId).toBe(1);
    expect(message).toBe("User logged in");
  });

  it("should check a user session", async () => {
    const { message, userId } = await authentication.checkSession();
    expect(message).toBe("User logged in");
    expect(userId).toBe(1);
  });

  it("should logout a user", async () => {
    const resp = await authentication.logout();

    expect(resp.message).toBe("User logged out");
  });
});
