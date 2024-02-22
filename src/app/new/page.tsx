import ResponsiveAppBar from "@/component/appBar";
import PostForm from "@/component/postForm";
import { Box } from "@mui/material";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add new post | Blog CMS",
  description: "Add new post to the blog CMS",
  keywords: "Add new post to the blog CMS",
};

function NewPost() {
  return (
    <Box>
      <ResponsiveAppBar />
      <PostForm />
    </Box>
  );
}

export default NewPost;
