import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import axios from "axios";
import AppProvider from "@/config/appProvider";
import FormLogin from "@/component/formLogin";
import { fakeUser } from "../unit/user/fakeUser";

jest.mock("next/navigation", () => require("next-router-mock"));
jest.mock("axios");

beforeAll(() => {
  axios.post = jest.fn().mockResolvedValue({
    data: fakeUser[0],
    status: 200,
  });

  axios.get = jest.fn().mockResolvedValue({
    data: fakeUser,
    status: 200,
  });
});

describe("FormLogin Test", () => {
  it("should form have field email, password and a login button", () => {
    render(<FormLogin />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent("Login");
  });

  it("should show Invalid password if password is incorrect", async () => {
    render(
      <AppProvider>
        <FormLogin />
      </AppProvider>
    );

    const email = screen.getByLabelText("Email");
    const password = screen.getByLabelText("Password");

    fireEvent.change(email, { target: { value: fakeUser[0].email } });
    fireEvent.change(password, { target: { value: "admin" } });

    await act(async () => {
      await fireEvent.click(screen.getByRole("button"));
    });

    expect(screen.getByText("Invalid password")).toBeInTheDocument();
  });

  it("should show user not found if email is not in data", async () => {
    render(
      <AppProvider>
        <FormLogin />
      </AppProvider>
    );

    const email = screen.getByLabelText("Email");
    const password = screen.getByLabelText("Password");

    fireEvent.change(email, { target: { value: "admin@admin.com" } });
    fireEvent.change(password, {
      target: { value: process.env.NEXT_PUBLIC_DEFAULT_USER_PASSWORD },
    });

    await act(async () => {
      await fireEvent.click(screen.getByRole("button"));
    });

    expect(screen.getByText("User not found")).toBeInTheDocument();
  });

  it("should log user successfully", async () => {
    render(
      <AppProvider>
        <FormLogin />
      </AppProvider>
    );

    const email = screen.getByLabelText("Email");
    const password = screen.getByLabelText("Password");

    fireEvent.change(email, { target: { value: fakeUser[2].email } });
    fireEvent.change(password, {
      target: { value: process.env.NEXT_PUBLIC_DEFAULT_USER_PASSWORD },
    });

    await act(async () => {
      await fireEvent.click(screen.getByRole("button"));
    });

    expect(screen.queryByText("User not found")).toBeNull();
    expect(screen.queryByText("Invalid password")).toBeNull();
  });
});
