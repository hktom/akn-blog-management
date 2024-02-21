import { user } from "@/config/bootsrap";
import { IPost } from "@/lib/post/interface";
import { IUser } from "@/lib/user/interface";
import { Box, Typography } from "@mui/material";

async function PostAuthor({ post }: { post: IPost }) {
  const { data, error, status } = await user!.getUserById(post.userId);

  if (error) return <></>;

  const author = data as IUser;

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
        Author
      </Typography>
      <Typography variant="body1" component="p">
        {author.name}, <br /> {author.email} - {author.phone}, {author.website},{" "}
        <br />
        {author.company.name}, {author.company.catchPhrase}, {author.company.bs}
        , {author.address.city}, {author.address.street}, {author.address.suite}
        , {author.address.zipcode}
      </Typography>
    </Box>
  );
}

export default PostAuthor;
