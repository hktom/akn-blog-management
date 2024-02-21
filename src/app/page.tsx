import ResponsiveAppBar from "@/component/appBar";
import PostList from "@/component/postList";
import { Box } from "@mui/material";
import { post } from "@/config/bootsrap";
import { IPost } from "@/lib/post/interface";

export default async function Home() {
  const { data, error, status } = await post?.getPost();
  let posts: IPost[] = [];

  if (status === 200) {
    posts = data as IPost[];
  }

  return (
    <Box>
      <ResponsiveAppBar />

      <Box sx={{ maxWidth: "80rem", mx: "auto", mt: 5 }}>
        <PostList data={posts} />
      </Box>
    </Box>
  );
}
