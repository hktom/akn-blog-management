"use client";

import { AppsContext } from "@/config/appProvider";
import { IPost } from "@/lib/post/interface";
import { useContext, useState } from "react";
import PostList from "../postList";

interface IProps {
  posts: IPost[];
}

function PostRouter({ posts }: IProps) {
  const { page, setPage } = useContext(AppsContext);
  const [data, setData] = useState<IPost[]>(posts);

  if (page === 0) {
    return <PostList posts={data} />;
  }

  return <h1>New post</h1>;
}

export default PostRouter;
