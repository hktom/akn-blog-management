import ResponsiveAppBar from "@/component/appBar";
import PostList from "@/component/postList";
import { Box, Typography } from "@mui/material";
import { post } from "@/config/bootsrap";
import { IPost } from "@/lib/post/interface";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Welcome",
  description: "Home page of the blog CMS",
  keywords: "Home page of the blog",
};

export default async function HomePage() {
  const { data, error, status } = await post?.getPost();
  let posts: IPost[] = [];

  if (status === 200) {
    posts = data as IPost[];
  }

  return (
    <Box>
      <ResponsiveAppBar />

      <Box sx={{ maxWidth: "80rem", mx: "auto", mt: 5 }}>
        <Typography component={"h1"} variant="h3" role="heading" sx={{ mb: 1 }}>
          Posts
        </Typography>

        <PostList data={posts} />
      </Box>
    </Box>
  );
}
