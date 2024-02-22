"use client";

import ResponsiveAppBar from "@/component/appBar";
import PostAuthor from "@/component/postAuthor";
import { AppsContext } from "@/config/appProvider";
import { IUser } from "@/lib/user/interface";
import { Box, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";

const PostFallBack = ({ postId }: { postId: number }) => {
  const { postActivity, user } = useContext(AppsContext);
  const [author, setAuthor] = useState<IUser | null>(null);

  useEffect(() => {
    async function getAuthor() {
      if (!postActivity?.currentPost) return;
      const resp = await user!.getUserById(postActivity?.currentPost!.userId!);
      if (!resp.error) {
        setAuthor(resp.data as IUser);
      }
    }

    getAuthor();
  }, [postActivity?.currentPost, postId, user]);

  if (!postActivity?.currentPost)
    return (
      <>
        <ResponsiveAppBar />
        <Typography component={"h2"} variant="h3" sx={{ mt: 5 }}>
          Post not found
        </Typography>
      </>
    );

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
          {postActivity?.currentPost!.title}
        </Typography>
        <Typography component={"p"} variant="body1">
          {postActivity?.currentPost!.body}
        </Typography>

        <PostAuthor author={author} />
      </Box>
    </Box>
  );
};
export default PostFallBack;
