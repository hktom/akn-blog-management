"use client";

import Authentication from "@/lib/authentication/authentication";
import Commentary from "@/lib/comment/comment";
import Cookie from "@/lib/cookie/cookies";
import Post from "@/lib/post/post";
import { IUser } from "@/lib/user/interface";
import User from "@/lib/user/user";
import { createContext, useEffect, useState } from "react";
import { authentication, user, comment, post, cookie } from "./bootsrap";

interface IAppContext {
  user: User;
  comment: Commentary;
  post: Post;
  cookie: Cookie;
  authentication: Authentication;
  currentUser: IUser | null;
  userId: number | null;
}

export const AppsContext = createContext<Partial<IAppContext>>({});

interface IProps {
  children: React.ReactNode;
}

function AppProvider({ children }: IProps) {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

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
      }}
    >
      {children}
    </AppsContext.Provider>
  );
}

export default AppProvider;
