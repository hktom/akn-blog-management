import Http from "@/lib/http/http";
import axios from "axios";

beforeAll(() => {
  jest.mock("axios");
});

describe("Http tests", () => {
  it("should send a get request", async () => {
    axios.get = jest
      .fn()
      .mockResolvedValue({ data: "data", status: 200, error: null });
    const http = new Http(axios);
    const url = "http://localhost:3000";
    const { data, status, error } = await http.get(url);
    expect(data).toBe("data");
    expect(status).toBe(200);
    expect(error).toBeNull();
  });

  it("should send a post request", async () => {
    axios.post = jest
      .fn()
      .mockResolvedValue({ data: "data", status: 200, error: null });
    const http = new Http(axios);
    const url = "http://localhost:3000";
    const payload = { name: "John Doe" };
    const { data, status, error } = await http.post(url, payload);
    expect(data).toBe("data");
    expect(status).toBe(200);
    expect(error).toBeNull();
  });

  it("should send a put request", async () => {
    axios.put = jest
      .fn()
      .mockResolvedValue({ data: "data", status: 200, error: null });
    const http = new Http(axios);
    const url = "http://localhost:3000";
    const payload = { name: "John Doe" };
    const { data, status, error } = await http.put(url, payload);
    expect(data).toBe("data");
    expect(status).toBe(200);
    expect(error).toBeNull();
  });

  it("should send a delete request", async () => {
    axios.delete = jest
      .fn()
      .mockResolvedValue({ data: "data", status: 200, error: null });
    const http = new Http(axios);
    const url = "http://localhost:3000";
    const { data, status, error } = await http.delete(url);
    expect(data).toBe("data");
    expect(status).toBe(200);
    expect(error).toBeNull();
  });
});
