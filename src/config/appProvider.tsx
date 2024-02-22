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

interface IPostActivity {
  posts: IPost[];
  add: (post: IPost) => void;
  init: (posts: IPost[]) => void;
  currentPost: IPost | null;
  setCurrentPost: (post: IPost | null) => void;
}

interface IAppContext {
  user: User;
  comment: Commentary;
  post: Post;
  cookie: Cookie;
  authentication: Authentication;
  currentUser: IUser | null;
  userId: number | null;
  postActivity: Partial<IPostActivity>;
  fetchCurrentUser: () => void;
}

export const AppsContext = createContext<Partial<IAppContext>>({});

interface IProps {
  children: React.ReactNode;
}

function AppProvider({ children }: IProps) {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [currentPost, setCurrentPost] = useState<IPost | null>(null);
  const [posts, setPosts] = useState<IPost[]>([]);

  const addPost = (post: IPost) => {
    setPosts((prev) => [post, ...prev]);
  };

  const initPosts = (posts: IPost[]) => {
    setTimeout(() => {
      setPosts((prev) => [...posts]);
    }, 1000);
  };

  const fetchCurrentUser = async () => {
    const session = await authentication.checkSession();

    if (!session.userId) {
      setCurrentUser(null);
      setUserId(null);
      return;
    }

    const { data } = await user.getUserById(session.userId);

    setCurrentUser(data as IUser);
    setUserId(session.userId);
  };

  useEffect(() => {
    fetchCurrentUser();
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
        fetchCurrentUser,
        postActivity: {
          currentPost,
          setCurrentPost,
          posts,
          add: addPost,
          init: initPosts,
        },
      }}
    >
      {children}
    </AppsContext.Provider>
  );
}

export default AppProvider;
