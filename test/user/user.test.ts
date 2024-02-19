import axios from "axios";
import { fakeUser } from "./fakeUser";
import User from "../../src/lib/user/user";
import { IUser } from "@/lib/user/interface";

beforeAll(async () => {
  return jest.mock("axios");
});

describe("User tests", () => {
  test("Get user by id", async () => {
    const resp = { data: fakeUser[0], status: 200, error: null };
    axios.get = jest.fn().mockResolvedValue(resp);

    const user = new User(axios, process.env.NEXT_PUBLIC_API_URL as string);
    const userId = 1;
    const { data, error, status } = await user.getUserById(userId);

    expect(status).toBe(200);
    expect(error).toBeNull();
    expect((data as IUser).id).toEqual(fakeUser[0].id);
  });

  test("Get user by email", async () => {
    const resp = { data: fakeUser, status: 200, error: null };
    axios.get = jest.fn().mockResolvedValue(resp);

    const user = new User(axios, process.env.NEXT_PUBLIC_API_URL as string);
    const userEmail = "Sincere@april.biz";
    const { data, error, status } = await user.getUserByEmail(userEmail);

    expect(status).toBe(200);
    expect(error).toBeNull();
    expect((data as IUser).email).toEqual(fakeUser[0].email);
  });
});
