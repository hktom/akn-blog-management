import ResponsiveAppBar from "@/component/appBar";
import PostList from "@/component/postList";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box>
      <ResponsiveAppBar />
      <Box sx={{ maxWidth: "80rem", mx: "auto", mt: 5 }}>
        <PostList />
      </Box>
    </Box>
  );
}
