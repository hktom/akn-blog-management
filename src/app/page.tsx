import ResponsiveAppBar from "@/component/appBar";
import PostList from "@/component/postList";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box>
      <ResponsiveAppBar />
      <Box>
        <PostList />
      </Box>
    </Box>
  );
}
