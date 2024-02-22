import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import AppProvider from "../../src/config/appProvider";
import axios from "axios";
import { fakeUser } from "../unit/user/fakeUser";
import PostAuthor from "@/component/postAuthor";

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
    render(<PostAuthor author={fakeUser[0]} />);
    expect(screen.getByText("Author")).toBeInTheDocument();
    // expect(screen.getByText(fakeUser[0].name)).toBeInTheDocument();
    // expect(screen.getByText(fakeUser[0].email)).toBeInTheDocument();
    // expect(screen.getByText(fakeUser[0].phone)).toBeInTheDocument();
    // expect(screen.getByText(fakeUser[0].address.street)).toBeInTheDocument();
    // expect(screen.getByText(fakeUser[0].company.name)).toBeInTheDocument();
    // expect(screen.getByText(fakeUser[0].website)).toBeInTheDocument();
  });

  
});
