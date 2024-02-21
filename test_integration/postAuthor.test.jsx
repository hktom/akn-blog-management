import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import PostAuthor from "../src/component/postAuthor";
import AppProvider from "../src/config/appProvider";
import Home from "../src/app/page";
import axios from "axios";

jest.mock("next/navigation", () => require("next-router-mock"));
jest.mock("axios");

beforeAll(() => {
  axios.get = jest.fn().mockResolvedValue({
    data: fakeUser[0],
    status: 200,
  });
});

describe("Component Author test", () => {
  it("should not render the author", () => {
    render(
      <AppProvider>
        <PostAuthor />
      </AppProvider>
    );
  });
});
