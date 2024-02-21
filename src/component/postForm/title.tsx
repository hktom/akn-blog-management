import { IPost } from "@/lib/post/interface";
import { Typography } from "@mui/material";

const Title = ({ currentPost }: { currentPost: IPost | null | undefined }) => {
  if (currentPost === null) {
    return (
      <Typography component={"h2"} variant="h3">
        New Post
      </Typography>
    );
  }
  return (
    <Typography component={"h2"} variant="h3">
      Edit Post
    </Typography>
  );
};

export default Title;
