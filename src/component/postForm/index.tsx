"use client";

import { AppsContext } from "@/config/appProvider";
import { IPost } from "@/lib/post/interface";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import PostAuthor from "../postAuthor";
import PostComment from "../postComment";

function PageForm() {
  const { post, postActivity, userId } = useContext(AppsContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading((prev) => !prev);

    const id = postActivity!.posts!.slice(0, 1)[0].id + 1;

    const resp = await post?.addPost({ title, body, id, userId: userId! });
    if (resp?.error) {
      setError(resp.error);
      setLoading(false);
      return;
    }
    postActivity?.add!({ ...(resp!.data as IPost), id });
  };

  return (
    <Box sx={{ maxWidth: "80rem", mt: 5, mx: "auto" }}>
      <Typography component={"h2"} variant="h3">
        New Post
      </Typography>

      <Box
        component="form"
        sx={{ maxWidth: "40rem", px: 3, py: 10, bgcolor: "#fff", mt: 3 }}
        onSubmit={handleSubmit}
      >
        {error && (
          <Alert severity="error" sx={{ my: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          name="title"
          label="Title"
          variant="outlined"
          type="text"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          id="body"
          label="body"
          multiline
          rows={4}
          sx={{ my: 2 }}
          variant="outlined"
          fullWidth
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <Button variant="contained" type="submit" disabled={loading}>
          Save
        </Button>
        <PostAuthor />
        <PostComment />
      </Box>
    </Box>
  );
}

export default PageForm;
