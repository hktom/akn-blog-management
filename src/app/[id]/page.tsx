import ResponsiveAppBar from "@/component/appBar";
import PostAuthor from "@/component/postAuthor";
import PostComment from "@/component/postComment";
import { post } from "@/config/bootsrap";
import { IPost } from "@/lib/post/interface";
import { Box, Typography } from "@mui/material";

async function PageDetails({ params }: { params: { id: string } }) {
  const resp = await post.showPost(+params.id);

  if (resp.error) return <></>;

  const data: IPost = resp.data as IPost;

  return (
    <Box>
      <ResponsiveAppBar />
      <Box sx={{ maxWidth: "80rem", mt: 5, mx: "auto" }}>
        <Box sx={{ maxWidth: "40rem", px: 3, py: 10, bgcolor: "#fff" }}>
          <Typography component={"h2"} variant="h3">
            {data.title}
          </Typography>
          <Typography component={"p"} variant="body1">
            {data.body}
          </Typography>

          <PostAuthor post={data} />
          <PostComment post={data} />
        </Box>
      </Box>
    </Box>
  );
}

export default PageDetails;
