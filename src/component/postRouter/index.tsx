"use client";

import { AppsContext } from "@/config/appProvider";
import { IPost } from "@/lib/post/interface";
import { useContext, useState } from "react";
import PostList from "../postList";
import PostForm from "../postForm";

interface IProps {
  posts: IPost[];
}

function PostRouter({ posts }: IProps) {
  const { page, setPage } = useContext(AppsContext);
  const [data, setData] = useState<IPost[]>(posts);

  if (page === 0) {
    return <PostList data={data} />;
  }

  return <PostForm data={data} setData={setData} />;
}

export default PostRouter;
