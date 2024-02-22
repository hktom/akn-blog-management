import ResponsiveAppBar from "@/component/appBar";
import PostAuthor from "@/component/postAuthor";
import PostComment from "@/component/postComment";
import { comment, post, user } from "@/config/bootsrap";
import { IComment } from "@/lib/comment/interface";
import { IPost } from "@/lib/post/interface";
import { IUser } from "@/lib/user/interface";
import { Box, Typography } from "@mui/material";
import PostFallBack from "./postFallback";

async function PageDetails({ params }: { params: { id: string } }) {
  const resp = await post.showPost(+params.id);

  if (resp.error) return <PostFallBack postId={+params.id} />;

  const data: IPost = resp.data as IPost;

  const respAuthor = await user!.getUserById(data.userId);
  const respComments = await comment!.getComments(data.id);

  const author = respAuthor.data as IUser;
  const comments = respComments.data as IComment[];

  return (
    <Box>
      <ResponsiveAppBar />
      <Box
        sx={{
          maxWidth: "80rem",
          mt: 5,
          mx: "auto",
          bgcolor: "#fff",
          px: 10,
          py: 10,
        }}
      >
        <Typography component={"h2"} variant="h3">
          {data.title}
        </Typography>
        <Typography component={"p"} variant="body1">
          {data.body}
        </Typography>

        <PostAuthor author={author} />
        <PostComment comments={comments} />
      </Box>
    </Box>
  );
}

export default PageDetails;
