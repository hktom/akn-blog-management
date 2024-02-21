"use client";

import Authentication from "@/lib/authentication/authentication";
import Commentary from "@/lib/comment/comment";
import Cookie from "@/lib/cookie/cookies";
import Post from "@/lib/post/post";
import { IUser } from "@/lib/user/interface";
import User from "@/lib/user/user";
import { createContext, useEffect, useState } from "react";
import { authentication, user, comment, post, cookie } from "./bootsrap";
import { IPost } from "@/lib/post/interface";

interface IAppContext {
  user: User;
  comment: Commentary;
  post: Post;
  cookie: Cookie;
  authentication: Authentication;
  currentUser: IUser | null;
  userId: number | null;
  page: number;
  setPage: (page: number) => void;
  currentPost: IPost | null;
  setCurrentPost: (post: IPost | null) => void;
}

export const AppsContext = createContext<Partial<IAppContext>>({});

interface IProps {
  children: React.ReactNode;
}

function AppProvider({ children }: IProps) {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const [currentPost, setCurrentPost] = useState<IPost | null>(null);

  const updatePage = (page: number) => setPage(page);
  const updatePost = (post: IPost | null) => setCurrentPost(post);

  useEffect(() => {
    const getUserId = async () => {
      const session = await authentication.checkSession();

      if (!session.userId) return;

      const { data } = await user.getUserById(session.userId);
      setCurrentUser(data as IUser);
      setUserId(session.userId);
    };
    getUserId();
  }, []);
  return (
    <AppsContext.Provider
      value={{
        user,
        comment,
        post,
        cookie,
        authentication,
        currentUser,
        userId,
        page,
        setPage: updatePage,
        currentPost,
        setCurrentPost: updatePost,
      }}
    >
      {children}
    </AppsContext.Provider>
  );
}

export default AppProvider;
