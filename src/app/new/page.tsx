import ResponsiveAppBar from "@/component/appBar";
import PostForm from "@/component/postForm";
import { Box } from "@mui/material";

function NewPost() {
  return (
    <Box>
      <ResponsiveAppBar />
      <PostForm />
    </Box>
  );
}

export default NewPost;
