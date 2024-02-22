import axios from "axios";

interface HttpInterface {
  get: (url: string) => Promise<any>;
  post: (url: string, data: any) => Promise<any>;
  put: (url: string, data: any) => Promise<any>;
  delete: (url: string) => Promise<any>;
}

interface IResponse {
  data: any;
  error: any;
  status: number;
}

class Http implements HttpInterface {
  constructor(private fetch: any) {}

  async get(url: string): Promise<IResponse> {
    try {
      return await this.fetch.get(url);
    } catch (error) {
      return { data: null, error, status: 500 };
    }
  }

  async post(url: string, data: any) {
    try {
      return await this.fetch.post(url, data);
    } catch (error) {
      return { data: null, error, status: 500 };
    }
  }

  async put(url: string, data: any) {
    try {
      return await this.fetch.put(url, data);
    } catch (error) {
      return { data: null, error, status: 500 };
    }
  }

  async delete(url: string) {
    try {
      return await this.fetch.delete(url);
    } catch (error) {
      {
        return { data: null, error, status: 500 };
      }
    }
  }
}

export default Http;