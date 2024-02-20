import Authentication from "@/lib/authentication/authentication";
import Commentary from "@/lib/comment/comment";
import Cookie from "@/lib/cookie/cookies";
import Post from "@/lib/post/post";
import User from "@/lib/user/user";
import axios from "axios";
import Cookies from "js-cookie";

export const user = new User(axios, process.env.NEXT_PUBLIC_API_URL || "");
export const comment = new Commentary(axios, process.env.NEXT_PUBLIC_API_URL || "");
export const post = new Post(axios, process.env.NEXT_PUBLIC_API_URL || "");
export const cookie = new Cookie(Cookies, "userId");
export const authentication = new Authentication(
  user,
  process.env.NEXT_PUBLIC_DEFAULT_USER_PASSWORD || "",
  cookie
);